"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTemplate = void 0;
var MediaTemplate = /** @class */ (function () {
    function MediaTemplate() {
        this.elements = [];
    }
    MediaTemplate.prototype.addElement = function (element) {
        this.elements.push(element);
        return this;
    };
    MediaTemplate.prototype.toJSON = function () {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'media',
                    elements: this.elements
                }
            }
        };
    };
    return MediaTemplate;
}());
exports.MediaTemplate = MediaTemplate;
