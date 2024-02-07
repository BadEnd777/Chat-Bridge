import { CallButton } from '../button/CallButton';
import { PostbackButton } from '../button/PostbackButton';
import { UrlButton } from '../button/UrlButton';

export class MediaElement {
    private mediaType: string;
    private attachmentId?: string;
    private url?: string;
    private buttons: Array<CallButton | PostbackButton | UrlButton> = [];

    constructor(mediaType: string, media: string) {
        this.mediaType = mediaType;
        if (mediaType === 'image') {
            this.url = media;
        } else {
            this.attachmentId = media;
        }
    }

    public addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): MediaElement {
        this.buttons = this.buttons.concat(buttons);
        return this;
    }

    toJSON() {
        return {
            media_type: this.mediaType,
            attachment_id: this.attachmentId,
            url: this.url,
            buttons: this.buttons
        };
    }
}
