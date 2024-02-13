import { FastifyInstance } from 'fastify';
import { EventEmitter } from 'events';

interface ClientOptions {
    accessToken: string;
    verifyToken: string;
    endpoint?: string;
    port?: number;
    host?: string;
    loggers?: boolean;
}

interface PageInformation {
    name: string;
    id: string;
}

declare class PersistentMenu {
    private psid;
    private persistentMenu;
    constructor(psid: string, persistentMenu: PersistentMenuItem[]);
    toJSON(): {
        psid: string;
        persistent_menu: PersistentMenuItem[];
    };
}
declare class PersistentMenuItem {
    private locale;
    private composerInputDisabled;
    private callToActions;
    constructor(locale: string, composerInputDisabled: boolean, callToActions: CallToAction[]);
    toJSON(): {
        locale: string;
        composer_input_disabled: boolean;
        call_to_actions: CallToAction[];
    };
}
declare class CallToAction {
    private type;
    private title;
    private payload;
    private url;
    private webviewHeightRatio;
    constructor(type: string, title: string, payload: string, url: string, webviewHeightRatio: string);
    toJSON(): {
        type: string;
        title: string;
        payload: string;
        url: string;
        webview_height_ratio: string;
    };
}

/**
 * @type {Client}
 * @example
 * const { Client } = require('@badend/chatbridge');
 *
 * const client = new Client({
 *      accessToken: "YOUR_ACCESS_TOKEN", // required
 *      verifyToken: "YOUR_VERIFY_TOKEN", // required
 *      // webHookPath: "/webhook", // default
 *      // port: 8080, // default
 *      // host: "localhost", // default (only for development) or 0.0.0.0 (for production)
 * });
 */
declare class Client extends EventEmitter {
    server: FastifyInstance;
    private accessToken;
    private verifyToken;
    endpoint: string;
    port: number;
    host: string;
    page: PageInformation;
    constructor(options: ClientOptions);
    private handleVerifyRequest;
    private handleWebhookRequest;
    /**
     * Start the server
     * @memberof Client
     * @example
     * client.start(async () => console.log(`Listening on ${client.page.name} (${client.page.id})`));
     * @param {Function} [callback]
     */
    start(callback?: () => void): Promise<void>;
    /**
     * Register a plugin
     * @memberof Client
     * @example
     * client.register(require('fastify-cors'), {
     *      origin: '*',
     * });
     * @param {Function} ...args
     */
    register(...args: Parameters<FastifyInstance['register']>): Promise<undefined>;
    private sendRequest;
    /**
     * Send an API message
     * @memberof Client
     * @example
     * client.sendApiMessage("USER_ID", {
     *      text: "Hello, World!",
     *      quick_replies: [
     *          {
     *              content_type: "text",
     *              title: "Hello",
     *              payload: "HELLO",
     *          }
     *      ]
     * });
     * @param {string} recipientId
     * @param {object} message
     */
    sendApiMessage(recipientId: string, message: object): Promise<unknown>;
    /**
     * Send a message
     * @memberof Client
     * @example
     * client.send("USER_ID", {
     *      text: "Hello, World!",
     *      quick_replies: [
     *          {
     *              content_type: "text",
     *              title: "Hello",
     *              payload: "HELLO",
     *          }
     *      ]
     * });
     * @param {string} recipientId
     * @param {object} message
     */
    send(recipientId: string, message: object): Promise<unknown>;
    /**
     * Get page information
     * @memberof Client
     * @example
     * const pageInformation = await client.getPageInfo();
     * console.log(pageInformation);
     * @returns
     * { name: "Page Name", id: "PAGE_ID" }
     */
    getPageInfo(): Promise<Pick<PageInformation, 'name' | 'id'>>;
    /**
     * Send a text message
     * @memberof Client
     * @example
     * client.sendTextMessage("USER_ID", "Hello World!");
     * @param {string} recipientId
     * @param {string} text
     */
    sendTextMessage(recipientId: string, text: string): Promise<unknown>;
    /**
     * Send an attachment
     * @memberof Client
     * @example
     * client.sendAttachment("USER_ID", "image", "https://example.com/image.png");
     * @param {string} recipientId
     * @param {string} type - image, audio, video, file
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    sendAttachment(recipientId: string, type: string, url: string, isReusable?: boolean): Promise<unknown>;
    /**
     * Send an image
     * @memberof Client
     * @example
     * client.sendImage("USER_ID", "https://example.com/image.png");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    sendImage(recipientId: string, url: string, isReusable?: boolean): Promise<unknown>;
    /**
     * Send an audio
     * @memberof Client
     * @example
     * client.sendAudio("USER_ID", "https://example.com/audio.mp3");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    sendAudio(recipientId: string, url: string, isReusable?: boolean): Promise<unknown>;
    /**
     * Send a video
     * @memberof Client
     * @example
     * client.sendVideo("USER_ID", "https://example.com/video.mp4");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    sendVideo(recipientId: string, url: string, isReusable?: boolean): Promise<unknown>;
    /**
     * Send a file
     * @memberof Client
     * @example
     * client.sendFile("USER_ID", "https://example.com/file.pdf");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    sendFile(recipientId: string, url: string, isReusable?: boolean): Promise<unknown>;
    /**
     * Set typing indicator
     * @memberof Client
     * @example
     * client.setTyping("USER_ID", true);
     * @param {string} recipientId
     * @param {boolean} typing
     */
    setTyping(recipientId: string, typing: boolean): Promise<unknown>;
    /**
     * Set persistent menu
     * @memberof Client
     * @example
     * const { PersistentMenu, PersistentMenuItem, CallToAction } = require('chat-bridge');
     *
     * const persistentMenu = new PersistentMenu('12345', [
     *     new PersistentMenuItem('default', false, [
     *         new CallToAction('postback', 'Help', 'HELP_PAYLOAD', '', ''),
     *         new CallToAction('postback', 'Start', 'START_PAYLOAD', '', '')
     *     ])
     * ]);
     *
     * client.setPersistentMenu(persistentMenu);
     * @param {PersistentMenu} persistentMenu
     */
    setPersistentMenu(psid: string, persistentMenu: PersistentMenuItem[]): Promise<unknown>;
    /**
     * Get persistent menu
     * @memberof Client
     * @example
     * client.getPersistentMenu("12345");
     * @param {string} psid
     */
    getPersistentMenu(psid: string): Promise<unknown>;
    /**
     * Delete persistent menu
     * @memberof Client
     * @example
     * client.deletePersistentMenu("12345");
     * @param {string} psid
     */
    deletePersistentMenu(psid: string): Promise<unknown>;
}

/**
 * Collections class
 * @class
 * @classdesc A class to manage collections
 * @property {Array} items - An array to store items
 * @method add - A method to add an item to the collection
 * @method get - A method to get an item from the collection
 * @example
 * const collections = new Collections();
 *
 * collections.add({ name: 'item1', value: 1 });
 * collections.add({ name: 'item2', value: 2 });
 * collections.get('item1'); // { name: 'item1', value: 1 }
 * collections.get('item2'); // { name: 'item2', value: 2 }
 * */
declare class Collections {
    private items;
    constructor();
    add(item: any): void;
    get(name: string): any;
}

/**
 * Constants
 * @example
 * const { Constants } = require('chat-bridge');
 *
 * console.log(Constants.BASE_URL); // https://graph.facebook.com/
 * console.log(Constants.MESSAGE_URL); // https://graph.facebook.com/v18.0/me/
 */
declare const Constants: {
    BASE_URL: string;
    MESSAGE_URL: string;
};

declare class CallButton {
    private title;
    private phoneNumber;
    constructor(title: string, payload: string);
    toJSON(): {
        type: string;
        title: string;
        payload: string;
    };
}

declare class PostbackButton {
    private title;
    private payload;
    constructor(title: string, payload: string);
    toJSON(): {
        type: string;
        title: string;
        payload: string;
    };
}

declare class UrlButton {
    private title;
    private url;
    constructor(title: string, url: string);
    toJSON(): {
        type: string;
        title: string;
        url: string;
    };
}

declare class GenericElement {
    private title;
    private subtitle;
    private imageUrl;
    private itemUrl?;
    private buttons;
    constructor(title: string, subtitle: string, imageUrl: string);
    setItemUrl(itemUrl: string): GenericElement;
    addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): GenericElement;
    toJSON(): {
        title: string;
        subtitle: string;
        image_url: string;
        item_url: string | undefined;
        buttons: (CallButton | PostbackButton | UrlButton)[];
    };
}

declare class Greeting {
    private locale;
    private text;
    constructor(locale: string, text: string);
    toJSON(): {
        locale: string;
        text: string;
    };
}

declare class MediaElement {
    private mediaType;
    private attachmentId?;
    private url?;
    private buttons;
    constructor(mediaType: string, media: string);
    addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): MediaElement;
    toJSON(): {
        media_type: string;
        attachment_id: string | undefined;
        url: string | undefined;
        buttons: (CallButton | PostbackButton | UrlButton)[];
    };
}

declare class ProductElement {
    private id;
    constructor(id: string);
    toJSON(): {
        id: string;
    };
}

declare class ReceiptElement {
    private title;
    private subtitle;
    private quantity;
    private price;
    private currency;
    private imageUrl;
    constructor(title: string, subtitle: string, quantity: number, price: number, currency: string, imageUrl: string);
    toJSON(): {
        title: string;
        subtitle: string;
        quantity: number;
        price: number;
        currency: string;
        image_url: string;
    };
}

declare class ButtonTemplate {
    private text;
    private buttons;
    constructor(text: string);
    addButtons(buttons: Array<CallButton | PostbackButton | UrlButton>): ButtonTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                text: string;
                buttons: (CallButton | PostbackButton | UrlButton)[];
            };
        };
    };
}

declare class CouponTemplate {
    private title;
    private subtitle?;
    private couponCode;
    private couponUrl;
    private couponUrlButtonTitle?;
    private couponPreMessage?;
    private imageUrl?;
    private payload?;
    constructor(title: string, couponCode: string, couponUrl: string);
    setTitle(title: string): CouponTemplate;
    setSubtitle(subtitle: string): CouponTemplate;
    setCouponCode(couponCode: string): CouponTemplate;
    setCouponUrl(couponUrl: string): CouponTemplate;
    setCouponUrlButtonTitle(couponUrlButtonTitle: string): CouponTemplate;
    setCouponPreMessage(couponPreMessage: string): CouponTemplate;
    setImageUrl(imageUrl: string): CouponTemplate;
    setPayload(payload: string): CouponTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                title: string;
                subtitle: string | undefined;
                coupon_code: string;
                coupon_url: string;
                coupon_url_button_title: string | undefined;
                coupon_pre_message: string | undefined;
                image_url: string | undefined;
                payload: string | undefined;
            };
        };
    };
}

declare enum FeedbackQuestionType {
    CSAT = "csat",
    NPS = "nps",
    CES = "ces"
}
declare class FeedbackTemplate {
    private title;
    private subtitle;
    private buttonTitle;
    private feedbackScreens;
    private businessPrivacy;
    private expiresInDays?;
    constructor(title: string, subtitle: string, buttonTitle: string);
    addFeedbackScreens(feedbackScreens: Array<FeedbackScreen>): FeedbackTemplate;
    setBusinessPrivacy(url: string): FeedbackTemplate;
    setExpiresInDays(expiresInDays: number): FeedbackTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                title: string;
                subtitle: string;
                button_title: string;
                feedback_screens: FeedbackScreen[];
                business_privacy: {
                    url: string;
                };
                expires_in_days: number | undefined;
            };
        };
    };
}
declare class FeedbackScreen {
    private questions;
    addQuestions(questions: Array<FeedbackQuestion>): FeedbackScreen;
    toJSON(): {
        questions: FeedbackQuestion[];
    };
}
declare class FeedbackQuestion {
    private id;
    private type;
    private title?;
    private scoreLabel?;
    private scoreOption?;
    private followUp?;
    constructor(id: string, type: FeedbackQuestionType);
    setTitle(title: string): FeedbackQuestion;
    setScoreLabel(scoreLabel: string): FeedbackQuestion;
    setScoreOption(scoreOption: string): FeedbackQuestion;
    setFollowUp(followUp: FollowUp): FeedbackQuestion;
    toJSON(): {
        id: string;
        type: FeedbackQuestionType;
        title: string | undefined;
        score_label: string | undefined;
        score_option: string | undefined;
        follow_up: FollowUp | undefined;
    };
}
declare class FollowUp {
    private type;
    private placeholder?;
    constructor(type: string);
    setPlaceholder(placeholder: string): FollowUp;
    toJSON(): {
        type: string;
        placeholder: string | undefined;
    };
}

declare class GenericTemplate {
    private elements;
    addElement(element: GenericElement): GenericTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                elements: GenericElement[];
            };
        };
    };
}

declare class MediaTemplate {
    private elements;
    addElement(element: MediaElement): MediaTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                elements: MediaElement[];
            };
        };
    };
}

declare class ProductTemplate {
    private elements;
    addElement(element: ProductElement): ProductTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                elements: ProductElement[];
            };
        };
    };
}

declare class QuickReplies {
    private title;
    private quickReplies;
    constructor(title: string);
    addQuickReply(quickReplies: QuickReply[]): QuickReplies;
    toJSON(): {
        text: string;
        quick_replies: QuickReply[];
    };
}
declare class QuickReply {
    private title;
    private payload?;
    private imageUrl?;
    constructor(title: string);
    setPayload(payload: string): QuickReply;
    setImageUrl(imageUrl: string): QuickReply;
    toJSON(): {
        content_type: string;
        title: string;
        payload: string | undefined;
        image_url: string | undefined;
    };
}

declare class ReceiptTemplate {
    private recipientName;
    private orderNumber;
    private currency;
    private paymentMethod;
    private timestamp;
    private elements;
    private address?;
    private summary?;
    private adjustments;
    constructor(recipientName: string, orderNumber: string, currency: string, paymentMethod: string, timestamp: string);
    addElement(element: ReceiptElement): ReceiptTemplate;
    setAddress(address: Address): ReceiptTemplate;
    setSummary(summary: Summary): ReceiptTemplate;
    addAdjustments(adjustments: Array<Adjustment>): ReceiptTemplate;
    toJSON(): {
        attachment: {
            type: string;
            payload: {
                template_type: string;
                recipient_name: string;
                order_number: string;
                currency: string;
                payment_method: string;
                timestamp: string;
                elements: ReceiptElement[];
                address: Address | undefined;
                summary: Summary | undefined;
                adjustments: Adjustment[];
            };
        };
    };
}
declare class Address {
    private street1;
    private street2?;
    private city;
    private postalCode;
    private state;
    private country;
    constructor(street1: string, city: string, postalCode: string, state: string, country: string);
    setStreet2(street2: string): Address;
    toJSON(): {
        street_1: string;
        street_2: string | undefined;
        city: string;
        postal_code: string;
        state: string;
        country: string;
    };
}
declare class Summary {
    private subtotal;
    private shippingCost;
    private totalTax;
    private totalCost;
    constructor(subtotal: number, shippingCost: number, totalTax: number, totalCost: number);
    toJSON(): {
        subtotal: number;
        shipping_cost: number;
        total_tax: number;
        total_cost: number;
    };
}
declare class Adjustment {
    private name;
    private amount;
    constructor(name: string, amount: number);
    toJSON(): {
        name: string;
        amount: number;
    };
}

export { Address, Adjustment, ButtonTemplate, CallButton, CallToAction, Client, Collections, Constants, CouponTemplate, FeedbackQuestion, FeedbackQuestionType, FeedbackScreen, FeedbackTemplate, FollowUp, GenericElement, GenericTemplate, Greeting, MediaElement, MediaTemplate, PersistentMenu, PersistentMenuItem, PostbackButton, ProductElement, ProductTemplate, QuickReplies, QuickReply, ReceiptElement, ReceiptTemplate, Summary, UrlButton };
