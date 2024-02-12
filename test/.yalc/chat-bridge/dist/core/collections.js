"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = void 0;
/**
 * Collections class
 * @class
 * @classdesc A class to manage collections
 * @property {Array} items - An array to store items
 * @method add - A method to add an item to the collection
 * @method get - A method to get an item from the collection
 * @example
 * const collections = new Collections();
 *
 * collections.add({ name: 'item1', value: 1 });
 * collections.add({ name: 'item2', value: 2 });
 * collections.get('item1'); // { name: 'item1', value: 1 }
 * collections.get('item2'); // { name: 'item2', value: 2 }
 * */
var Collections = /** @class */ (function () {
    function Collections() {
        this.items = [];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Collections.prototype.add = function (item) {
        this.items.push(item);
    };
    Collections.prototype.get = function (name) {
        return this.items.find(function (item) { return item.name === name; });
    };
    return Collections;
}());
exports.Collections = Collections;
