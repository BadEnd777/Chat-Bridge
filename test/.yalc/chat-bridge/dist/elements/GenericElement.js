"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericElement = void 0;
var GenericElement = /** @class */ (function () {
    function GenericElement(title, subtitle, imageUrl) {
        this.buttons = [];
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
    }
    GenericElement.prototype.setItemUrl = function (itemUrl) {
        this.itemUrl = itemUrl;
        return this;
    };
    GenericElement.prototype.addButtons = function (buttons) {
        this.buttons = this.buttons.concat(buttons);
        return this;
    };
    GenericElement.prototype.toJSON = function () {
        return {
            title: this.title,
            subtitle: this.subtitle,
            image_url: this.imageUrl,
            item_url: this.itemUrl,
            buttons: this.buttons
        };
    };
    return GenericElement;
}());
exports.GenericElement = GenericElement;
