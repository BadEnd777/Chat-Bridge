import { MediaElement } from '../elements/MediaElement';

export class MediaTemplate {
    private elements: Array<MediaElement> = [];

    public addElement(element: MediaElement): MediaTemplate {
        this.elements.push(element);
        return this;
    }

    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'media',
                    elements: this.elements
                }
            }
        };
    }
}
