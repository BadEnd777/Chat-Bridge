export class Greeting {
    private locale: string;
    private text: string;

    constructor(locale: string, text: string) {
        this.locale = locale;
        this.text = text;
    }

    toJSON() {
        return {
            locale: this.locale,
            text: this.text
        };
    }
}
