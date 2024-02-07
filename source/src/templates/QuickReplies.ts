export class QuickReplies {
    private title: string;
    private quickReplies: Array<QuickReply> = [];

    constructor(title: string) {
        this.title = title;
    }

    public addQuickReply(quickReplies: QuickReply[]): QuickReplies {
        this.quickReplies = this.quickReplies.concat(quickReplies);
        return this;
    }

    toJSON() {
        return {
            text: this.title,
            quick_replies: this.quickReplies
        };
    }
}

export class QuickReply {
    private title: string;
    private payload?: string;
    private imageUrl?: string;

    constructor(title: string) {
        this.title = title;
    }

    public setPayload(payload: string): QuickReply {
        this.payload = payload;
        return this;
    }

    public setImageUrl(imageUrl: string): QuickReply {
        this.imageUrl = imageUrl;
        return this;
    }

    toJSON() {
        return {
            content_type: 'text',
            title: this.title,
            payload: this.payload,
            image_url: this.imageUrl
        };
    }
}
