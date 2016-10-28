export interface IEnumerable<TEntity> extends Iterable<TEntity> {
    where(predicate: (it: TEntity, ...param: any[]) => boolean, ...parameters: any[]): this;
    skip(count: number): this;
    take(count: number): this;
    toArray(): Array<TEntity>;
    getOperations(): Operation<TEntity>;
}
import { Operator } from './operators/operator';
export declare class Operation<TEntity> implements Iterable<Operator<TEntity>> {
    private _stack;
    constructor();
    add(operator: Operator<TEntity>): void;
    remove(operator: Operator<TEntity>): boolean;
    [Symbol.iterator]: () => Iterator<Operator<TEntity>>;
}
export default class Enumerable<TEntity> implements IEnumerable<TEntity> {
    private items;
    private _operations;
    constructor(items?: Array<TEntity>);
    where(predicate: (it: TEntity, ...param: any[]) => boolean, ...parameters: any[]): this;
    take(count: number): this;
    skip(count: number): this;
    orderBy(property: (it: TEntity) => void): this;
    toArray(items?: Array<TEntity>): Array<TEntity>;
    getOperations(): Operation<TEntity>;
    static fromArray<TEntity>(items?: Array<TEntity>): Enumerable<TEntity>;
    [Symbol.iterator]: () => Iterator<TEntity>;
}
