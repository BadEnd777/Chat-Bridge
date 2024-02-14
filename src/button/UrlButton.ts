export class UrlButton {
    private title: string;
    private url: string;

    constructor(title: string, url: string) {
        this.title = title;
        this.url = url;
    }

    toJSON() {
        return {
            type: 'web_url',
            title: this.title,
            url: this.url
        };
    }
}
