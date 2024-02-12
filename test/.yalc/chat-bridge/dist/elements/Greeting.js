"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greeting = void 0;
var Greeting = /** @class */ (function () {
    function Greeting(locale, text) {
        this.locale = locale;
        this.text = text;
    }
    Greeting.prototype.toJSON = function () {
        return {
            locale: this.locale,
            text: this.text
        };
    };
    return Greeting;
}());
exports.Greeting = Greeting;
