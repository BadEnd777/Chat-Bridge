export class PostbackButton {
    private title: string;
    private payload: string;

    constructor(title: string, payload: string) {
        this.title = title;
        this.payload = payload;
    }

    toJSON() {
        return {
            type: 'postback',
            title: this.title,
            payload: this.payload
        };
    }
}
