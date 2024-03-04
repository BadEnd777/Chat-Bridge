import { MediaElement } from '../elements/MediaElement';

/**
 * Represents a media template for creating rich media attachments.
 */
export class MediaTemplate {
    private elements: Array<MediaElement> = [];

    /**
     * Adds a media element to the media template.
     * @param element The media element to add.
     * @returns The updated media template.
     */
    public addElement(element: MediaElement): MediaTemplate {
        this.elements.push(element);
        return this;
    }

    /**
     * Converts the media template to a JSON object.
     * @returns The JSON representation of the media template.
     */
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
