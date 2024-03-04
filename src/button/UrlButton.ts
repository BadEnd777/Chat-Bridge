/**
 * Represents a URL button.
 */
export class UrlButton {
    private title: string;
    private url: string;

    /**
     * Creates a new instance of the UrlButton class.
     * @param title The title of the button.
     * @param url The URL associated with the button.
     */
    constructor(title: string, url: string) {
        this.title = title;
        this.url = url;
    }

    /**
     * Converts the UrlButton instance to JSON format.
     * @returns The JSON representation of the UrlButton.
     */
    toJSON() {
        return {
            type: 'web_url',
            title: this.title,
            url: this.url
        };
    }
}
