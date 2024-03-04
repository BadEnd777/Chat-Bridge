import { CallButton } from '../button/CallButton';
import { PostbackButton } from '../button/PostbackButton';
import { UrlButton } from '../button/UrlButton';

/**
 * Represents a button template for a chat message.
 */
export class ButtonTemplate {
    private text: string;
    private buttons: Array<CallButton | PostbackButton | UrlButton> = [];

    /**
     * Creates a new instance of ButtonTemplate.
     * @param text The text to be displayed in the template.
     */
    constructor(text: string) {
        this.text = text;
    }

    /**
     * Adds buttons to the template.
     * @param buttons The buttons to be added.
     * @returns The updated ButtonTemplate instance.
     */
    public addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): ButtonTemplate {
        this.buttons = this.buttons.concat(buttons);
        return this;
    }

    /**
     * Converts the ButtonTemplate instance to JSON format.
     * @returns The JSON representation of the ButtonTemplate.
     */
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: this.text,
                    buttons: this.buttons
                }
            }
        };
    }
}
