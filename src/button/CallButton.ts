export class CallButton {
    private title: string;
    private phoneNumber: string;

    constructor(title: string, payload: string) {
        this.title = title;
        this.phoneNumber = payload;
    }

    toJSON() {
        return {
            type: 'phone_number',
            title: this.title,
            payload: this.phoneNumber
        };
    }
}
