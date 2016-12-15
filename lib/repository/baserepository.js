"use strict";
const filters_1 = require("./filters/filters");
const whereoperator_1 = require("./../linq/operators/whereoperator");
class BaseRepository {
    constructor() {
    }
    beginTransaction() {
        return Promise.resolve();
    }
    commitTransaction() {
        return Promise.resolve();
    }
    rollbackTransaction() {
        return Promise.resolve();
    }
    /**
     * returns a IFilters if the predicate is solvable, otherwise it throws an error
     * @param predicate
     * @param parameters
     */
    getFilters(query) {
        let predicate = (entity) => true, parameters = [];
        for (let operator of query.operations.values())
            if (operator instanceof whereoperator_1.WhereOperator) {
                predicate = operator.predicate;
                parameters = operator.parameters;
                break;
            }
        return new filters_1.Filters(predicate, ...parameters);
    }
    getPredicateFn(query) {
        let predicate = (entity) => true, parameters = [];
        for (let operator of query.operations.values())
            if (operator instanceof whereoperator_1.WhereOperator) {
                predicate = operator.predicate;
                parameters = operator.parameters;
                break;
            }
        return (entity) => {
            return (predicate == null) ? true : predicate.apply({}, [entity].concat(parameters));
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseRepository;
//# sourceMappingURL=baserepository.js.map