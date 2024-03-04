/**
 * Represents a collection of quick replies for a chat message.
 */
export class QuickReplies {
    private title: string;
    private quickReplies: Array<QuickReply> = [];

    /**
     * Creates a new instance of QuickReplies.
     * @param title The title of the quick replies.
     */
    constructor(title: string) {
        this.title = title;
    }

    /**
     * Adds an array of quick replies to the collection.
     * @param quickReplies The quick replies to add.
     * @returns The updated QuickReplies instance.
     */
    public addQuickReply(quickReplies: QuickReply[]): QuickReplies {
        this.quickReplies = this.quickReplies.concat(quickReplies);
        return this;
    }

    /**
     * Converts the QuickReplies instance to a JSON object.
     * @returns The JSON representation of the QuickReplies instance.
     */
    toJSON() {
        return {
            text: this.title,
            quick_replies: this.quickReplies
        };
    }
}

/**
 * Represents a quick reply option for a chat message.
 */
export class QuickReply {
    private title: string;
    private payload?: string;
    private imageUrl?: string;

    /**
     * Creates a new QuickReply instance with the specified title.
     * @param title The title of the quick reply.
     */
    constructor(title: string) {
        this.title = title;
    }

    /**
     * Sets the payload for the quick reply.
     * @param payload The payload to be sent when the quick reply is selected.
     * @returns The updated QuickReply instance.
     */
    public setPayload(payload: string): QuickReply {
        this.payload = payload;
        return this;
    }

    /**
     * Sets the image URL for the quick reply.
     * @param imageUrl The URL of the image to be displayed with the quick reply.
     * @returns The updated QuickReply instance.
     */
    public setImageUrl(imageUrl: string): QuickReply {
        this.imageUrl = imageUrl;
        return this;
    }

    /**
     * Converts the QuickReply instance to a JSON object.
     * @returns The JSON representation of the QuickReply instance.
     */
    toJSON() {
        return {
            content_type: 'text',
            title: this.title,
            payload: this.payload,
            image_url: this.imageUrl
        };
    }
}
