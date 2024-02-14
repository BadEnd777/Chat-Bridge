import { ProductElement } from '../elements/ProductElement';

export class ProductTemplate {
    private elements: Array<ProductElement> = [];

    public addElement(element: ProductElement): ProductTemplate {
        this.elements.push(element);
        return this;
    }

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
