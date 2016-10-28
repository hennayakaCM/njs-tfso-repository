export interface IEnumerable<TEntity> extends Iterable<TEntity> {
    where(predicate: (it: TEntity, ...param: any[]) => boolean, ...parameters: any[]): this;
    skip(count: number): this;
    take(count: number): this;
    toArray(items: Array<TEntity>): Array<TEntity>;
    toArray(): Array<TEntity>;
    operations: Operation<TEntity>;
}
import { Operator } from './operators/operator';
export declare class Operation<TEntity> {
    private _stack;
    constructor();
    add(operator: Operator<TEntity>): void;
    remove(operator: Operator<TEntity>): boolean;
    values(): IterableIterator<Operator<TEntity>>;
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
    operations: Operation<TEntity>;
    static fromArray<TEntity>(items?: Array<TEntity>): Enumerable<TEntity>;
    [Symbol.iterator]: () => Iterator<TEntity>;
}
