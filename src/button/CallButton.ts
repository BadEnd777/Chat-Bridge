/**
 * Represents a call button that can be used in a chat interface.
 */
export class CallButton {
    private title: string;
    private phoneNumber: string;

    /**
     * Creates a new instance of the CallButton class.
     * @param title The title of the call button.
     * @param payload The phone number associated with the call button.
     */
    constructor(title: string, payload: string) {
        this.title = title;
        this.phoneNumber = payload;
    }

    /**
     * Converts the CallButton object to a JSON representation.
     * @returns The JSON representation of the CallButton object.
     */
    toJSON() {
        return {
            type: 'phone_number',
            title: this.title,
            payload: this.phoneNumber
        };
    }
}
