"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlButton = void 0;
var UrlButton = /** @class */ (function () {
    function UrlButton(title, url) {
        this.title = title;
        this.url = url;
    }
    UrlButton.prototype.toJSON = function () {
        return {
            type: 'web_url',
            title: this.title,
            url: this.url
        };
    };
    return UrlButton;
}());
exports.UrlButton = UrlButton;
