import { Operator } from './operator';
export declare class WhereOperator<TEntity> extends Operator<TEntity> {
    predicate: (it: TEntity, ...param: any[]) => boolean;
    private _parameters;
    constructor(predicate: (it: TEntity, ...param: any[]) => boolean, ...parameters: any[]);
    parameters: any[];
    evaluate(items: TEntity[]): TEntity[];
}
