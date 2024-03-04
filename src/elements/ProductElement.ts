/**
 * Represents a product element.
 */
export class ProductElement {
    private id: string;

    /**
     * Creates a new instance of the ProductElement class.
     * @param id - The ID of the product element.
     */
    constructor(id: string) {
        this.id = id;
    }

    /**
     * Converts the product element to JSON format.
     * @returns The JSON representation of the product element.
     */
    toJSON() {
        return {
            id: this.id
        };
    }
}
