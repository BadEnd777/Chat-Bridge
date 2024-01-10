"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
/**
 * Collection class.
 * @export
 * @class Collection
 * @template T
 */
var Collection = /** @class */ (function () {
    function Collection() {
        this.items = {};
    }
    /**
     * Add an item to the collection.
     * @param {T} item
     */
    Collection.prototype.add = function (item) {
        var key = this.getKey(item);
        this.items[key] = item;
    };
    /**
     * Get an item from the collection.
     * @param {string} key
     * @returns {T}
     */
    Collection.prototype.get = function (key) {
        return this.items[key];
    };
    /**
     * Get all items from the collection.
     * @returns {T[]}
     */
    Collection.prototype.getAll = function () {
        return Object.values(this.items);
    };
    /**
     * Remove an item from the collection.
     * @param {string} key
     */
    Collection.prototype.remove = function (key) {
        delete this.items[key];
    };
    /**
     * Remove all items from the collection.
     */
    Collection.prototype.removeAll = function () {
        this.items = {};
    };
    /**
     * Get the key of an item.
     * @private
     * @param {T} item
     * @returns {string}
     */
    Collection.prototype.getKey = function (item) {
        return item.id;
    };
    return Collection;
}());
exports.Collection = Collection;
