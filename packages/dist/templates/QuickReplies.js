"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickReply = exports.QuickReplies = void 0;
var QuickReplies = /** @class */ (function () {
    function QuickReplies(title) {
        this.quickReplies = [];
        this.title = title;
    }
    QuickReplies.prototype.addQuickReply = function (quickReplies) {
        this.quickReplies = this.quickReplies.concat(quickReplies);
        return this;
    };
    QuickReplies.prototype.toJSON = function () {
        return {
            text: this.title,
            quick_replies: this.quickReplies
        };
    };
    return QuickReplies;
}());
exports.QuickReplies = QuickReplies;
var QuickReply = /** @class */ (function () {
    function QuickReply(title) {
        this.title = title;
    }
    QuickReply.prototype.setPayload = function (payload) {
        this.payload = payload;
        return this;
    };
    QuickReply.prototype.setImageUrl = function (imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    };
    QuickReply.prototype.toJSON = function () {
        return {
            content_type: 'text',
            title: this.title,
            payload: this.payload,
            image_url: this.imageUrl
        };
    };
    return QuickReply;
}());
exports.QuickReply = QuickReply;
