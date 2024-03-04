import { ProductElement } from '../elements/ProductElement';

/**
 * Represents a product template.
 */
export class ProductTemplate {
    private elements: Array<ProductElement> = [];

    /**
     * Adds an element to the product template.
     * @param element The element to add.
     * @returns The updated product template.
     */
    public addElement(element: ProductElement): ProductTemplate {
        this.elements.push(element);
        return this;
    }

    /**
     * Converts the product template to JSON format.
     * @returns The JSON representation of the product template.
     */
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'product',
                    elements: this.elements
                }
            }
        };
    }
}
