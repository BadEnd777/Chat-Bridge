import { CallButton } from '../button/CallButton';
import { PostbackButton } from '../button/PostbackButton';
import { UrlButton } from '../button/UrlButton';

export class ButtonTemplate {
    private text: string;
    private buttons: Array<CallButton | PostbackButton | UrlButton> = [];

    constructor(text: string) {
        this.text = text;
    }

    public addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): ButtonTemplate {
        this.buttons = this.buttons.concat(buttons);
        return this;
    }

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
