"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallButton = void 0;
var CallButton = /** @class */ (function () {
    function CallButton(title, payload) {
        this.title = title;
        this.phoneNumber = payload;
    }
    CallButton.prototype.toJSON = function () {
        return {
            type: 'phone_number',
            title: this.title,
            payload: this.phoneNumber
        };
    };
    return CallButton;
}());
exports.CallButton = CallButton;
