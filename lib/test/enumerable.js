"use strict";
const assert = require('assert');
const enumerable_1 = require('./../linq/enumerable');
describe("When using Enumerable", () => {
    var list;
    beforeEach(() => {
        list = [
            { id: 1, location: 'SKIEN', registrationYear: 2016 },
            { id: 2, location: 'PORSGRUNN', registrationYear: 2010 },
            { id: 3, location: 'PORSGRUNN', registrationYear: 2005 },
            { id: 4, location: 'LANGESUND', registrationYear: 2004 },
            { id: 5, location: 'BREVIK', registrationYear: 2009 },
            { id: 6, location: 'BREVIK', registrationYear: 2014 },
            { id: 7, location: 'HEISTAD', registrationYear: 2013 },
            { id: 8, location: 'LARVIK', registrationYear: 2009 }
        ];
    });
    it("should take top 1", () => {
        var ar = new enumerable_1.default(list).take(1).toArray();
        assert.ok(ar.length == 1);
    });
    it("should skip 5", () => {
        var ar = new enumerable_1.default(list).skip(5).toArray();
        assert.ok(ar[0].id == 6);
    });
    it("should skip 5 and take 3", () => {
        var ar = new enumerable_1.default(list).skip(5).take(3).toArray();
        assert.ok(ar.length == 3);
        assert.ok(ar[0].id == 6);
    });
    it("should order by a property", () => {
        var ar = new enumerable_1.default(list).orderBy(it => it.location).toArray();
        assert.deepEqual(ar.map(item => item.location), ["BREVIK", "BREVIK", "HEISTAD", "LANGESUND", "LARVIK", "PORSGRUNN", "PORSGRUNN", "SKIEN"]);
    });
    it("should be able to iterate", () => {
        var ar = new enumerable_1.default(list).take(3);
        assert.equal(Array.from(ar).length, 3);
    });
    it("should just work", () => {
        let query = new enumerable_1.default();
        query.skip(5);
        query.take(3);
        var ar = query.toArray(list);
        assert.ok(ar.length == 3);
        assert.ok(ar[0].id == 6);
    });
    it("should iterate through operations", () => {
        let query = new enumerable_1.default();
        query.skip(5);
        query.take(3);
        var operations = query.operations.values();
        var count = 0;
        for (let operator of operations) {
            if (operator) {
                count++;
            }
        }
        assert.equal(count, 2);
    });
});
//# sourceMappingURL=enumerable.js.map