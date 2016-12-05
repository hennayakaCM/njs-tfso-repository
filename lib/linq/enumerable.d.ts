export interface IEnumerable<TEntity> extends Iterable<TEntity> {
    where(predicate: (it: TEntity, ...param: any[]) => boolean, ...parameters: any[]): this;
    skip(count: number): this;
    take(count: number): this;
    toArray(items: Array<TEntity>): Array<TEntity>;
    toArray(): Array<TEntity>;
    readonly operations: Operation<TEntity>;
}
import { Operator, OperatorType } from './operators/operator';
export { OperatorType };
export declare class Operation<TEntity> {
    private _stack;
    constructor();
    add(operator: Operator<TEntity>): void;
    remove(operator: Operator<TEntity>): boolean;
    first<T extends Operator<TEntity>>(operator: {
        new (...args: any[]): T;
    }): T;
    first(operator: {
        new (...args: any[]): Operator<TEntity>;
    }): Operator<TEntity>;
    first(operatorType: OperatorType): Operator<TEntity>;
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
    readonly operations: Operation<TEntity>;
    static fromArray<TEntity>(items?: Array<TEntity>): Enumerable<TEntity>;
    [Symbol.iterator]: () => Iterator<TEntity>;
}
