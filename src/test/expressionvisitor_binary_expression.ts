﻿import * as assert from 'assert';
import * as Expr from './../linq/expressions/expressionvisitor';

describe("When using ExpressionVisitor for binary Lambda Expression", () => {
    var visitor: Expr.ExpressionVisitor,
        expr: Expr.IExpression;


    beforeEach(() => {
        visitor = new Expr.ExpressionVisitor;
    })

    it("it should return a binary operation", () => {
        expr = visitor.visitLambda(() => 5 + 2);

        console.log(expr.toString());

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).left.type == Expr.ExpressionType.Literal, "Expected a literal at left side");
        assert.ok((<Expr.IBinaryExpression>expr).right.type == Expr.ExpressionType.Literal, "Expected a lteral at right side");
        assert.ok((<Expr.ILiteralExpression>(<Expr.IBinaryExpression>expr).left).value == 5, "Expected number 5 at left side");
        assert.ok((<Expr.ILiteralExpression>(<Expr.IBinaryExpression>expr).right).value == 2, "Expected number 5 at right side");
    });

    it("it should handle binary operation for addition", () => {
        expr = visitor.visitLambda(() => 5 + 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Addition, "Expected a binary operation of addition");
    });

    it("it should handle binary operation for addition for negative number", () => {
        expr = visitor.visitLambda(() => 5 + -2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Addition, "Expected a binary operation of addition");
        assert.ok((<Expr.IBinaryExpression>expr).right.type == Expr.ExpressionType.Unary, "Expected a unary expression at right side of addition");
    });

    it("it should handle binary operation for addition for positive number", () => {
        expr = visitor.visitLambda(() => 5 + +2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Addition, "Expected a binary operation of addition");
        assert.ok((<Expr.IBinaryExpression>expr).right.type == Expr.ExpressionType.Unary, "Expected a unary expression at right side of addition");
    });

    it("it should handle binary operation for subtraction", () => {
        expr = visitor.visitLambda(() => 5 - 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Subtraction, "Expected a binary operation of subtraction");
    });

    it("it should handle binary operation for subtraction for negative number", () => {
        expr = visitor.visitLambda(() => 5 - -2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Subtraction, "Expected a binary operation of subtraction");
        assert.ok((<Expr.IBinaryExpression>expr).right.type == Expr.ExpressionType.Unary, "Expected a unary expression at right side of substraction");
    });

    it("it should handle binary operation for subtraction for positive number", () => {
        expr = visitor.visitLambda(() => 5 - +2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Subtraction, "Expected a binary operation of subtraction");
        assert.ok((<Expr.IBinaryExpression>expr).right.type == Expr.ExpressionType.Unary, "Expected a unary expression at right side of substraction");
    });

    it("it should handle binary operation for multiplication", () => {
        expr = visitor.visitLambda(() => 5 * 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Multiplication, "Expected a binary operation of multiplication");
    });

    it("it should handle binary operation for division", () => {
        expr = visitor.visitLambda(() => 5 / 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Division, "Expected a binary operation of division");
    });

    it("it should handle binary operation for modulus", () => {
        expr = visitor.visitLambda(() => 5 % 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Modulus, "Expected a binary operation of modulus");
    });

    it("it should handle binary operation for and", () => {
        expr = visitor.visitLambda(() => 5 & 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.And, "Expected a binary operation of and");
    });

    it("it should handle binary operation for or", () => {
        expr = visitor.visitLambda(() => 5 | 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.Or, "Expected a binary operation of or");
    });

    it("it should handle binary operation for left shift", () => {
        expr = visitor.visitLambda(() => 5 << 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.LeftShift, "Expected a binary operation of left shift");
    });

    it("it should handle binary operation for right shift", () => {
        expr = visitor.visitLambda(() => 5 >> 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.RightShift, "Expected a binary operation of right shift");
    });

    it("it should handle binary operation for zero-fill right shift", () => {
        expr = visitor.visitLambda(() => 5 >>> 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.RightShift, "Expected a binary operation of right shift");
    });

    it("it should handle binary operation for exlusive or", () => {
        expr = visitor.visitLambda(() => 5 ^ 2);

        assert.ok(expr.type == Expr.ExpressionType.Binary, "Expected a BinaryExpression");
        assert.ok((<Expr.IBinaryExpression>expr).operator == Expr.BinaryOperatorType.ExclusiveOr, "Expected a binary operation of exclusive or");
    });
});
