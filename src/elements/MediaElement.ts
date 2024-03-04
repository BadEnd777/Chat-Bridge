import { CallButton } from '../button/CallButton';
import { PostbackButton } from '../button/PostbackButton';
import { UrlButton } from '../button/UrlButton';

/**
 * Represents a media element used in a chat message.
 */
export class MediaElement {
    private mediaType: string;
    private attachmentId?: string;
    private url?: string;
    private buttons: Array<CallButton | PostbackButton | UrlButton> = [];

    /**
     * Creates a new MediaElement instance.
     * @param mediaType The type of media (e.g., 'image', 'video').
     * @param media The media content (either a URL or an attachment ID).
     */
    constructor(mediaType: string, media: string) {
        this.mediaType = mediaType;
        if (mediaType === 'image') {
            this.url = media;
        } else {
            this.attachmentId = media;
        }
    }

    /**
     * Adds buttons to the media element.
     * @param buttons The buttons to add.
     * @returns The updated MediaElement instance.
     */
    public addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): MediaElement {
        this.buttons = this.buttons.concat(buttons);
        return this;
    }

    /**
     * Converts the MediaElement instance to a JSON object.
     * @returns The JSON representation of the MediaElement.
     */
    toJSON() {
        return {
            media_type: this.mediaType,
            attachment_id: this.attachmentId,
            url: this.url,
            buttons: this.buttons
        };
    }
}
