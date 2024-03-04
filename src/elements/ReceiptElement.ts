/**
 * Represents a receipt element.
 */
export class ReceiptElement {
    private title: string;
    private subtitle: string;
    private quantity: number;
    private price: number;
    private currency: string;
    private imageUrl: string;

    /**
     * Creates a new instance of ReceiptElement.
     * @param title - The title of the element.
     * @param subtitle - The subtitle of the element.
     * @param quantity - The quantity of the element.
     * @param price - The price of the element.
     * @param currency - The currency of the element.
     * @param imageUrl - The URL of the image associated with the element.
     */
    constructor(title: string, subtitle: string, quantity: number, price: number, currency: string, imageUrl: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
    }

    /**
     * Converts the receipt element to JSON format.
     * @returns The JSON representation of the receipt element.
     */
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
