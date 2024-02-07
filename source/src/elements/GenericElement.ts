import { CallButton } from '../button/CallButton';
import { PostbackButton } from '../button/PostbackButton';
import { UrlButton } from '../button/UrlButton';

export class GenericElement {
    private title: string;
    private subtitle: string;
    private imageUrl: string;
    private itemUrl?: string;
    private buttons: Array<CallButton | PostbackButton | UrlButton> = [];

    constructor(title: string, subtitle: string, imageUrl: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
    }

    public setItemUrl(itemUrl: string): GenericElement {
        this.itemUrl = itemUrl;
        return this;
    }

    public addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): GenericElement {
        this.buttons = this.buttons.concat(buttons);
        return this;
    }

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
