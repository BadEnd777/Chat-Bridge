"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTemplate = void 0;
var ProductTemplate = /** @class */ (function () {
    function ProductTemplate() {
        this.elements = [];
    }
    ProductTemplate.prototype.addElement = function (element) {
        this.elements.push(element);
        return this;
    };
    ProductTemplate.prototype.toJSON = function () {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'product',
                    elements: this.elements
                }
            }
        };
    };
    return ProductTemplate;
}());
exports.ProductTemplate = ProductTemplate;
