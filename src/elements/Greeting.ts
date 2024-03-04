/**
 * Represents a greeting message.
 */
export class Greeting {
    private locale: string;
    private text: string;

    /**
     * Creates a new instance of the Greeting class.
     * @param locale The locale of the greeting.
     * @param text The text of the greeting.
     */
    constructor(locale: string, text: string) {
        this.locale = locale;
        this.text = text;
    }

    /**
     * Converts the Greeting object to JSON format.
     * @returns The JSON representation of the Greeting object.
     */
    toJSON() {
        return {
            locale: this.locale,
            text: this.text
        };
    }
}
