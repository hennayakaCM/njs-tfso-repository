import { IExpression, Expression } from './expression';
export declare enum LogicalOperatorType {
    And = 0,
    Or = 1,
    NotEqual = 2,
    LesserOrEqual = 3,
    GreaterOrEqual = 4,
    Lesser = 5,
    Greater = 6,
    Equal = 7,
}
export interface ILogicalExpression extends IExpression {
    operator: LogicalOperatorType;
    left: IExpression;
    right: IExpression;
}
export declare class LogicalExpression extends Expression implements ILogicalExpression {
    operator: LogicalOperatorType;
    left: IExpression;
    right: IExpression;
    constructor(operator: LogicalOperatorType, left: IExpression, right: IExpression);
}