"use strict";
const orderbyoperator_1 = require('./operators/orderbyoperator');
const skipoperator_1 = require('./operators/skipoperator');
const takeoperator_1 = require('./operators/takeoperator');
const whereoperator_1 = require('./operators/whereoperator');
class Operation {
    constructor() {
        this._stack = [];
    }
    add(operator) {
        this._stack.push(operator);
    }
    remove(operator) {
        var idx = this._stack.indexOf(operator);
        if (idx != -1) {
            this._stack.splice(idx, 1);
            return true;
        }
        return false;
    }
    *values() {
        while (true) {
            for (let item of this._stack) {
                var reset = yield item;
                if (reset === true)
                    break;
            }
            if (reset !== true)
                break;
        }
    }
}
exports.Operation = Operation;
class Enumerable {
    constructor(items) {
        this.items = items;
        this[Symbol.iterator] = function* () {
            let counter = 0;
            let result = this.toArray();
            while (true) {
                for (let item of result) {
                    var reset = yield item;
                    if (reset === true)
                        break;
                }
                if (reset !== true)
                    break;
            }
        };
        this._operations = new Operation();
    }
    where(predicate, ...parameters) {
        this._operations.add(new whereoperator_1.WhereOperator(predicate, ...parameters));
        return this;
    }
    take(count) {
        this._operations.add(new takeoperator_1.TakeOperator(count));
        return this;
    }
    skip(count) {
        this._operations.add(new skipoperator_1.SkipOperator(count));
        return this;
    }
    orderBy(property) {
        this._operations.add(new orderbyoperator_1.OrderByOperator(property));
        return this;
    }
    toArray(items) {
        let ar = items || this.items;
        for (let item of this._operations.values())
            ar = item.evaluate(ar);
        return ar;
    }
    //public validateSequence(...operators: OperatorType[]): boolean {
    //    let idx = -1;
    //    return operators.every(operator => {
    //        let newIdx = 0;
    //        newIdx = this._stack.findIndex(item => (item.type & operator) > 0)
    //        if (newIdx == -1) {
    //            return true;
    //        } else if (newIdx > idx) {
    //            idx = newIdx; return true;
    //        } else {
    //            return false;
    //        }
    //    });
    //}
    //public getFirstOperator(type: OperatorType): Operator<TEntity> {
    //    for (let i = 0; i < this._stack.length; i++)
    //        if (this._stack[i].type == type)
    //            return this._stack[i];
    //}
    //public removeFirstOperator(type: OperatorType): Operator<TEntity> {
    //    for (let i = 0; i < this._stack.length; i++)
    //        if (this._stack[i].type == type)
    //            return this._stack.splice(i, 1)[0];
    //}
    get operations() {
        return this._operations;
    }
    static fromArray(items) {
        return new Enumerable(items);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Enumerable;
//# sourceMappingURL=enumerable.js.map