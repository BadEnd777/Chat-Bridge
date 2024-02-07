"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTemplate = void 0;
var GenericTemplate = /** @class */ (function () {
    function GenericTemplate() {
        this.elements = [];
    }
    GenericTemplate.prototype.addElement = function (element) {
        this.elements.push(element);
        return this;
    };
    GenericTemplate.prototype.toJSON = function () {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: this.elements
                }
            }
        };
    };
    return GenericTemplate;
}());
exports.GenericTemplate = GenericTemplate;
