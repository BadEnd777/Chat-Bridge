"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostbackButton = void 0;
var PostbackButton = /** @class */ (function () {
    function PostbackButton(title, payload) {
        this.title = title;
        this.payload = payload;
    }
    PostbackButton.prototype.toJSON = function () {
        return {
            type: 'postback',
            title: this.title,
            payload: this.payload
        };
    };
    return PostbackButton;
}());
exports.PostbackButton = PostbackButton;
