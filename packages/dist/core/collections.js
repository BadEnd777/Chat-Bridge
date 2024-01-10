"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = void 0;
/**
 * Collections class.
 * @export
 * @class Collections
 * @template T
 */
var Collections = /** @class */ (function () {
    function Collections() {
        this.items = {};
    }
    /**
     * Add an item to the Collections.
     * @param {T} item
     */
    Collections.prototype.add = function (item) {
        var key = this.getKey(item);
        this.items[key] = item;
    };
    /**
     * Get an item from the Collections.
     * @param {string} key
     * @returns {T}
     */
    Collections.prototype.get = function (key) {
        return this.items[key];
    };
    /**
     * Get all items from the Collections.
     * @returns {T[]}
     */
    Collections.prototype.getAll = function () {
        return Object.values(this.items);
    };
    /**
     * Remove an item from the Collections.
     * @param {string} key
     */
    Collections.prototype.remove = function (key) {
        delete this.items[key];
    };
    /**
     * Remove all items from the Collections.
     */
    Collections.prototype.removeAll = function () {
        this.items = {};
    };
    /**
     * Get the key of an item.
     * @private
     * @param {T} item
     * @returns {string}
     */
    Collections.prototype.getKey = function (item) {
        return item.id;
    };
    return Collections;
}());
exports.Collections = Collections;
