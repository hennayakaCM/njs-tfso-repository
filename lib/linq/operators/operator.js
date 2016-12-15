"use strict";
var OperatorType;
(function (OperatorType) {
    OperatorType[OperatorType["Where"] = 1] = "Where";
    OperatorType[OperatorType["Take"] = 2] = "Take";
    OperatorType[OperatorType["Skip"] = 4] = "Skip";
    OperatorType[OperatorType["OrderBy"] = 8] = "OrderBy";
})(OperatorType = exports.OperatorType || (exports.OperatorType = {}));
class Operator {
    constructor(type) {
        this.type = type;
    }
}
exports.Operator = Operator;
//# sourceMappingURL=operator.js.map