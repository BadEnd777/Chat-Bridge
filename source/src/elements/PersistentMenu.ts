export class PersistentMenu {
    private psid: string;
    private persistentMenu: PersistentMenuItem[];

    constructor(psid: string, persistentMenu: PersistentMenuItem[]) {
        this.psid = psid;
        this.persistentMenu = persistentMenu;
    }

    toJSON() {
        return {
            psid: this.psid,
            persistent_menu: this.persistentMenu
        };
    }
}

export class PersistentMenuItem {
    private locale: string;
    private composerInputDisabled: boolean;
    private callToActions: CallToAction[];

    constructor(locale: string, composerInputDisabled: boolean, callToActions: CallToAction[]) {
        this.locale = locale;
        this.composerInputDisabled = composerInputDisabled;
        this.callToActions = callToActions;
    }

    toJSON() {
        return {
            locale: this.locale,
            composer_input_disabled: this.composerInputDisabled,
            call_to_actions: this.callToActions
        };
    }
}

export class CallToAction {
    private type: string;
    private title: string;
    private payload: string;
    private url: string;
    private webviewHeightRatio: string;

    constructor(type: string, title: string, payload: string, url: string, webviewHeightRatio: string) {
        this.type = type;
        this.title = title;
        this.payload = payload;
        this.url = url;
        this.webviewHeightRatio = webviewHeightRatio;
    }

    toJSON() {
        return {
            type: this.type,
            title: this.title,
            payload: this.payload,
            url: this.url,
            webview_height_ratio: this.webviewHeightRatio
        };
    }
}
