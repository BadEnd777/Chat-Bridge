/**
 * Represents the query parameters for a webhook hub.
 */
export interface HubQuery {
    /**
     * The mode of the hub.
     */
    'hub.mode': string;
    /**
     * The challenge of the hub.
     */
    'hub.challenge': string;
    /**
     * The verify token of the hub.
     */
    'hub.verify_token': string;
}

/**
 * Represents the body of a webhook.
 */
export interface WebhookBody {
    /**
     * The object of the webhook.
     */
    object: string;
    /**
     * The entry of the webhook.
     */
    entry: Entry[];
}

/**
 * Represents an entry in the webhook payload.
 */
export interface Entry {
    /**
     * The ID of the entry.
     */
    id: string;
    /**
     * The time of the entry.
     */
    time: number;
    /**
     * The messaging of the entry.
     */
    messaging: Messaging[];
}

/**
 * Represents a messaging event.
 */
export interface Messaging {
    /**
     * The sender of the event.
     */
    sender: Sender;
    /**
     * The recipient of the event.
     */
    recipient: Recipient;
    /**
     * The timestamp of the event.
     */
    timestamp: number;
    /**
     * The message of the event.
     */
    message?: Message;
    /**
     * The postback of the event.
     */
    postback?: Postback;
    /**
     * The quick reply of the event.
     */
    quick_reply?: QuickReply;
    /**
     * The template of the event.
     */
    template?: Template;
}

/**
 * Represents a sender in a messaging event.
 */
export interface Sender {
    /**
     * The ID of the sender.
     */
    id: string;
}

/**
 * Represents a recipient in a messaging event.
 */
export interface Recipient {
    /**
     * The ID of the recipient.
     */
    id: string;
}

/**
 * Represents a message in a messaging event.
 */
export interface Message {
    /**
     * The mid of the message.
     */
    mid: string;
    /**
     * The text of the message.
     */
    text: string;
    /**
     * The quick reply of the message.
     */
    quick_reply?: QuickReply;
}

/**
 * Represents a postback in a messaging event.
 */
export interface Postback {
    /**
     * The payload of the postback.
     */
    title: string;
    /**
     * The payload of the postback.
     */
    payload: string;
}

/**
 * Represents a quick reply in a messaging event.
 */
export interface QuickReply {
    /**
     * The payload of the quick reply.
     */
    payload: string;
}

/**
 * Represents a template used in a webhook.
 */
export interface Template {
    /**
     * The type of the template.
     */
    template_type: string;
    /**
     * The text content of the template.
     */
    text: string;
    /**
     * The buttons associated with the template.
     */
    buttons: Button[];
}

/**
 * Represents a button in a webhook.
 */
export interface Button {
    /**
     * The type of the button.
     */
    type: string;
    /**
     * The title of the button.
     */
    title: string;
    /**
     * The payload of the button.
     */
    payload: string;
}
