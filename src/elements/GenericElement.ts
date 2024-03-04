import { CallButton } from '../button/CallButton';
import { PostbackButton } from '../button/PostbackButton';
import { UrlButton } from '../button/UrlButton';

/**
 * Represents a generic element used in a chat message.
 */
export class GenericElement {
    private title: string;
    private subtitle: string;
    private imageUrl: string;
    private itemUrl?: string;
    private buttons: Array<CallButton | PostbackButton | UrlButton> = [];

    /**
     * Creates a new instance of GenericElement.
     * @param title - The title of the element.
     * @param subtitle - The subtitle of the element.
     * @param imageUrl - The URL of the image associated with the element.
     */
    constructor(title: string, subtitle: string, imageUrl: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
    }

    /**
     * Sets the URL of the item associated with the element.
     * @param itemUrl - The URL of the item.
     * @returns The updated GenericElement instance.
     */
    public setItemUrl(itemUrl: string): GenericElement {
        this.itemUrl = itemUrl;
        return this;
    }

    /**
     * Adds buttons to the element.
     * @param buttons - An array of buttons to be added.
     * @returns The updated GenericElement instance.
     */
    public addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): GenericElement {
        this.buttons = this.buttons.concat(buttons);
        return this;
    }

    /**
     * Converts the GenericElement instance to JSON format.
     * @returns The JSON representation of the GenericElement instance.
     */
    toJSON() {
        return {
            title: this.title,
            subtitle: this.subtitle,
            image_url: this.imageUrl,
            item_url: this.itemUrl,
            buttons: this.buttons
        };
    }
}
