"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductElement = void 0;
var ProductElement = /** @class */ (function () {
    function ProductElement(id) {
        this.id = id;
    }
    ProductElement.prototype.toJSON = function () {
        return {
            id: this.id
        };
    };
    return ProductElement;
}());
exports.ProductElement = ProductElement;
