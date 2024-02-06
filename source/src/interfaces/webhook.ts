export interface HubQuery {
    'hub.mode': string;
    'hub.challenge': string;
    'hub.verify_token': string;
}

export interface WebhookBody {
    object: string;
    entry: Entry[];
}

export interface Entry {
    id: string;
    time: number;
    messaging: Messaging[];
}

export interface Messaging {
    sender: Sender;
    recipient: Recipient;
    timestamp: number;
    message?: Message;
    postback?: Postback;
    quick_reply?: QuickReply;
    template?: Template;
}

export interface Sender {
    id: string;
}

export interface Recipient {
    id: string;
}

export interface Message {
    mid: string;
    text: string;
    quick_reply?: QuickReply;
}

export interface Postback {
    title: string;
    payload: string;
}

export interface QuickReply {
    payload: string;
}

export interface Template {
    template_type: string;
    text: string;
    buttons: Button[];
}

export interface Button {
    type: string;
    title: string;
    payload: string;
}
