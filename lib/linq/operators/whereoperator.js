"use strict";
const operator_1 = require('./operator');
class WhereOperator extends operator_1.Operator {
    constructor(predicate, ...parameters) {
        super(operator_1.OperatorType.Where);
        this.predicate = predicate;
        this._parameters = parameters;
    }
    get parameters() {
        return this._parameters;
    }
    evaluate(items) {
        return items.filter(entity => {
            return this.predicate.apply({}, [entity].concat(this.parameters));
        });
    }
}
exports.WhereOperator = WhereOperator;
//# sourceMappingURL=whereoperator.js.map