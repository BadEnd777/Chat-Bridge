"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallToAction = exports.PersistentMenuItem = exports.PersistentMenu = void 0;
var PersistentMenu = /** @class */ (function () {
    function PersistentMenu(psid, persistentMenu) {
        this.psid = psid;
        this.persistentMenu = persistentMenu;
    }
    PersistentMenu.prototype.toJSON = function () {
        return {
            psid: this.psid,
            persistent_menu: this.persistentMenu
        };
    };
    return PersistentMenu;
}());
exports.PersistentMenu = PersistentMenu;
var PersistentMenuItem = /** @class */ (function () {
    function PersistentMenuItem(locale, composerInputDisabled, callToActions) {
        this.locale = locale;
        this.composerInputDisabled = composerInputDisabled;
        this.callToActions = callToActions;
    }
    PersistentMenuItem.prototype.toJSON = function () {
        return {
            locale: this.locale,
            composer_input_disabled: this.composerInputDisabled,
            call_to_actions: this.callToActions
        };
    };
    return PersistentMenuItem;
}());
exports.PersistentMenuItem = PersistentMenuItem;
var CallToAction = /** @class */ (function () {
    function CallToAction(type, title, payload, url, webviewHeightRatio) {
        this.type = type;
        this.title = title;
        this.payload = payload;
        this.url = url;
        this.webviewHeightRatio = webviewHeightRatio;
    }
    CallToAction.prototype.toJSON = function () {
        return {
            type: this.type,
            title: this.title,
            payload: this.payload,
            url: this.url,
            webview_height_ratio: this.webviewHeightRatio
        };
    };
    return CallToAction;
}());
exports.CallToAction = CallToAction;
