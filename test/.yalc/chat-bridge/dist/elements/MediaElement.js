"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaElement = void 0;
var MediaElement = /** @class */ (function () {
    function MediaElement(mediaType, media) {
        this.buttons = [];
        this.mediaType = mediaType;
        if (mediaType === 'image') {
            this.url = media;
        }
        else {
            this.attachmentId = media;
        }
    }
    MediaElement.prototype.addButtons = function (buttons) {
        this.buttons = this.buttons.concat(buttons);
        return this;
    };
    MediaElement.prototype.toJSON = function () {
        return {
            media_type: this.mediaType,
            attachment_id: this.attachmentId,
            url: this.url,
            buttons: this.buttons
        };
    };
    return MediaElement;
}());
exports.MediaElement = MediaElement;
