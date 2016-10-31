"use strict";
const enumerable_1 = require('./../../linq/enumerable');
const whereoperator_1 = require('./../../linq/operators/whereoperator');
class Query {
    constructor(query) {
        this._parameters = {};
        this._hasRun = false;
        this.query = query;
    }
    get query() {
        if (this._query == null)
            this._query = new enumerable_1.default();
        return this._query;
    }
    set query(value) {
        this._query = value;
        if (value != null) {
            for (let operator of value.operations.values())
                if (operator instanceof whereoperator_1.WhereOperator) {
                    this._predicateFootprint = new Object(operator.predicate).toString();
                    break;
                }
        }
    }
    set commandText(query) {
        this._commandText = query;
    }
    get commandText() {
        return this._commandText;
    }
    get parameters() {
        return this._parameters;
    }
    execute() {
        var stamped = Date.now();
        return this.executeQuery()
            .then((recordset) => {
            if (recordset.executionTime > 1000 || (recordset.executionTime == 0 && (Date.now() - stamped) > 1000))
                console.warn(`[WARNING]: Long running query (${(recordset.executionTime > 0 ? recordset.executionTime : Date.now() - stamped)}ms). Consider narrow down the result length (${recordset.length}pcs)${this._predicateFootprint.length > 0 ? " for predicate " + this._predicateFootprint : ""};\n    ${this.commandText}`);
            if (!this.onFulfilled)
                return Promise.resolve(recordset);
            return this.onFulfilled(recordset);
        }, (err) => {
            if (!this.onRejected)
                return Promise.reject(err);
            return this.onRejected(err);
        });
    }
    then(onFulfilled, onRejected) {
        if (this._hasRun == true)
            throw new Error('Query is not thread safe currently, please dispose Query after use');
        this._hasRun = true;
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
        return this.execute();
    }
    catch(onRejected) {
        if (this._hasRun == true)
            throw new Error('Query is not thread safe currently, please dispose Query after use');
        this.onRejected = onRejected;
        return this.execute();
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map