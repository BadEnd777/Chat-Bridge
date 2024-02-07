import { GenericElement } from '../elements/GenericElement';

export class GenericTemplate {
    private elements: Array<GenericElement> = [];

    public addElement(element: GenericElement): GenericTemplate {
        this.elements.push(element);
        return this;
    }

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
