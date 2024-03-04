import { GenericElement } from '../elements/GenericElement';

/**
 * Represents a generic template for creating structured messages.
 */
export class GenericTemplate {
    private elements: Array<GenericElement> = [];

    /**
     * Adds an element to the generic template.
     * @param element The element to add.
     * @returns The updated GenericTemplate instance.
     */
    public addElement(element: GenericElement): GenericTemplate {
        this.elements.push(element);
        return this;
    }

    /**
     * Converts the GenericTemplate instance to a JSON object.
     * @returns The JSON representation of the GenericTemplate.
     */
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: this.elements
                }
            }
        };
    }
}
