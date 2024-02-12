"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonTemplate = void 0;
var ButtonTemplate = /** @class */ (function () {
    function ButtonTemplate(text) {
        this.buttons = [];
        this.text = text;
    }
    ButtonTemplate.prototype.addButtons = function (buttons) {
        this.buttons = this.buttons.concat(buttons);
        return this;
    };
    ButtonTemplate.prototype.toJSON = function () {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: this.text,
                    buttons: this.buttons
                }
            }
        };
    };
    return ButtonTemplate;
}());
exports.ButtonTemplate = ButtonTemplate;
