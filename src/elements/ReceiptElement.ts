export class ReceiptElement {
    private title: string;
    private subtitle: string;
    private quantity: number;
    private price: number;
    private currency: string;
    private imageUrl: string;

    constructor(title: string, subtitle: string, quantity: number, price: number, currency: string, imageUrl: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
    }

    toJSON() {
        return {
            title: this.title,
            subtitle: this.subtitle,
            quantity: this.quantity,
            price: this.price,
            currency: this.currency,
            image_url: this.imageUrl
        };
    }
}
