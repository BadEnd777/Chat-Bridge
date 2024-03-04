/**
 * Represents a persistent menu for a specific user.
 */
export class PersistentMenu {
    private psid: string;
    private persistentMenu: PersistentMenuItem[];

    /**
     * Creates a new instance of PersistentMenu.
     * @param psid - The PSID (Page Scoped ID) of the user.
     * @param persistentMenu - The array of persistent menu items.
     */
    constructor(psid: string, persistentMenu: PersistentMenuItem[]) {
        this.psid = psid;
        this.persistentMenu = persistentMenu;
    }

    /**
     * Converts the PersistentMenu object to a JSON representation.
     * @returns The JSON representation of the PersistentMenu object.
     */
    toJSON() {
        return {
            psid: this.psid,
            persistent_menu: this.persistentMenu
        };
    }
}

/**
 * Represents a persistent menu item.
 */
export class PersistentMenuItem {
    private locale: string;
    private composerInputDisabled: boolean;
    private callToActions: CallToAction[];

    /**
     * Creates a new instance of PersistentMenuItem.
     * @param locale The locale of the menu item.
     * @param composerInputDisabled Indicates whether the composer input is disabled for this menu item.
     * @param callToActions The call to actions associated with this menu item.
     */
    constructor(locale: string, composerInputDisabled: boolean, callToActions: CallToAction[]) {
        this.locale = locale;
        this.composerInputDisabled = composerInputDisabled;
        this.callToActions = callToActions;
    }

    /**
     * Converts the persistent menu item to JSON format.
     * @returns The JSON representation of the persistent menu item.
     */
    toJSON() {
        return {
            locale: this.locale,
            composer_input_disabled: this.composerInputDisabled,
            call_to_actions: this.callToActions
        };
    }
}

/**
 * Represents a call to action in the persistent menu.
 */
export class CallToAction {
    private type: string;
    private title: string;
    private payload: string;
    private url: string;
    private webviewHeightRatio: string;

    /**
     * Creates a new instance of the CallToAction class.
     * @param type - The type of the call to action.
     * @param title - The title of the call to action.
     * @param payload - The payload of the call to action.
     * @param url - The URL of the call to action.
     * @param webviewHeightRatio - The webview height ratio of the call to action.
     */
    constructor(type: string, title: string, payload: string, url: string, webviewHeightRatio: string) {
        this.type = type;
        this.title = title;
        this.payload = payload;
        this.url = url;
        this.webviewHeightRatio = webviewHeightRatio;
    }

    /**
     * Converts the CallToAction object to a JSON representation.
     * @returns The JSON representation of the CallToAction object.
     */
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
