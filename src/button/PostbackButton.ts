/**
 * Represents a postback button.
 */
export class PostbackButton {
    private title: string;
    private payload: string;

    /**
     * Creates a new instance of the PostbackButton class.
     * @param title The title of the button.
     * @param payload The payload associated with the button.
     */
    constructor(title: string, payload: string) {
        this.title = title;
        this.payload = payload;
    }

    /**
     * Converts the PostbackButton instance to a JSON object.
     * @returns The JSON representation of the button.
     */
    toJSON() {
        return {
            type: 'postback',
            title: this.title,
            payload: this.payload
        };
    }
}
