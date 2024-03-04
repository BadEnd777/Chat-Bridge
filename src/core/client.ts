import { EventEmitter } from 'events';
import Fastify, { FastifyReply, FastifyRequest, type FastifyInstance } from 'fastify';
import { request } from 'undici';
import { PersistentMenuItem } from '../elements/PersistentMenu';
import { ClientOptions, Entry, HubQuery, PageInformation, WebhookBody } from '../interfaces';
import { HttpMethod } from '../types';
import { Constants } from './constants';

/**
 * Represents a client for interacting with a chat service.
 * Extends EventEmitter for event handling.
 */
export class Client extends EventEmitter {
    public server: FastifyInstance;
    private accessToken: string;
    private verifyToken: string;
    public endpoint: string;
    public port: number;
    public host: string;

    /**
     * Information about the page associated with the client.
     */
    public page: PageInformation = {
        name: '',
        id: ''
    };

    /**
     * Creates a new instance of the Client class.
     * @param options - The options for configuring the client.
     */
    constructor(options: ClientOptions) {
        super();

        this.server = Fastify();
        this.accessToken = options.accessToken;
        this.verifyToken = options.verifyToken;
        this.endpoint = options.endpoint || '/webhook';
        this.port = options.port || 8080;
        this.host = options.host || 'localhost';
    }

    /**
     * Handles the verification request from the chat service.
     * @param request - The Fastify request object.
     * @param reply - The Fastify reply object.
     * @returns The verification response.
     */
    private handleVerifyRequest(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as HubQuery;
        const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': verifyToken } = query;

        if (mode !== 'subscribe') return reply.code(400).send('Bad Request');
        if (verifyToken !== this.verifyToken) return reply.code(403).send('Forbidden');

        return reply.code(200).send(challenge);
    }

    /**
     * Handles the webhook request from the chat service.
     * @param request - The Fastify request object.
     * @param reply - The Fastify reply object.
     * @returns The webhook response.
     */
    private handleWebhookRequest(request: FastifyRequest, reply: FastifyReply) {
        const { body } = request;
        const { object, entry } = body as WebhookBody;

        if (object !== 'page') {
            reply.code(400).send('Bad Request');
            return;
        }

        entry.forEach((entry: Entry) => {
            const webhookEvent = entry.messaging[0];
            const { message, postback, template } = webhookEvent;
            let event = 'error';

            if (message && message.quick_reply) {
                event = 'quick_reply';
            } else if (message) {
                event = 'message';
            } else if (postback) {
                event = 'postback';
            } else if (template) {
                event = 'template';
            }

            this.emit(event, webhookEvent);
        });

        return reply.code(200).send('OK');
    }

    /**
     * Starts the client and listens for incoming requests.
     * @param callback - An optional callback function to be called when the server starts.
     */
    public async start(callback?: () => void) {
        this.server.post(this.endpoint, this.handleWebhookRequest.bind(this));
        this.server.get(this.endpoint, this.handleVerifyRequest.bind(this));

        const startServer = async () => {
            try {
                await this.server.listen({ port: this.port, host: this.host });
                if (callback) callback();
            } catch (err) {
                throw new Error(`Failed to start server: ${err}`);
            }
        };

        // Check page information
        if (!this.page.id) {
            try {
                await this.getPageInfo();
            } catch (err) {
                throw new Error(`Check your access token: ${err}`);
            }
        }

        await startServer();
    }

    /**
     * Registers a plugin with the client's server.
     * @param args - The arguments to pass to the Fastify register method.
     * @returns A promise that resolves when the plugin is registered.
     */
    public async register(...args: Parameters<FastifyInstance['register']>) {
        return this.server.register(...args);
    }

    /**
     * Sends a request to the specified path with the given method and body.
     * @param options - The options for the request.
     * @returns The response body of the request.
     * @throws Error if the request fails or the status code is not 200.
     */
    private async sendRequest(options: { method: HttpMethod; path?: string; body?: object }) {
        const { accessToken } = this;
        const { method, path, body } = options;
        const url = `${Constants.MESSAGE_URL}${path || ''}?access_token=${accessToken}`;
        const bodyString = JSON.stringify(body);
        const headers = {
            'Content-Type': 'application/json'
        };
        const { statusCode, body: response } = await request(url, {
            method,
            body: bodyString,
            headers
        });

        if (statusCode !== 200) {
            throw new Error(`Request failed: ${statusCode}\n${response}`);
        }

        const responseBody = await response.json();
        return responseBody;
    }

    /**
     * Sends an API message to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param message - The message to send.
     * @returns A promise that resolves with the API response.
     */
    public sendApiMessage(recipientId: string, message: object) {
        const body = {
            recipient: {
                id: recipientId
            },
            message
        };

        return this.sendRequest({ method: 'POST', path: 'messages', body });
    }

    /**
     * Sends a message to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param message - The message to send.
     * @returns A promise that resolves with the API response.
     */
    public send(recipientId: string, message: object) {
        return this.sendApiMessage(recipientId, message);
    }

    /**
     * Retrieves information about the page associated with the client.
     * @returns A promise that resolves with the page information.
     */
    public async getPageInfo(): Promise<Pick<PageInformation, 'name' | 'id'>> {
        const body = await this.sendRequest({ method: 'GET' });
        const { name, id } = body as PageInformation;
        this.page.name = name;
        this.page.id = id;

        return { name, id };
    }

    /**
     * Sends a text message to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param text - The text message to send.
     * @returns A promise that resolves with the API response.
     */
    public async sendTextMessage(recipientId: string, text: string) {
        return this.sendApiMessage(recipientId, { text });
    }

    /**
     * Sends an attachment to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param type - The type of the attachment (image, audio, video, file).
     * @param url - The URL of the attachment.
     * @param isReusable - Indicates whether the attachment is reusable.
     * @returns A promise that resolves with the API response.
     */
    public async sendAttachment(recipientId: string, type: string, url: string, isReusable: boolean = false) {
        return this.sendApiMessage(recipientId, {
            attachment: {
                type, // image, audio, video, file
                payload: {
                    url,
                    is_reusable: isReusable
                }
            }
        });
    }

    /**
     * Sends an image attachment to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param url - The URL of the image.
     * @param isReusable - Indicates whether the image is reusable.
     * @returns A promise that resolves with the API response.
     */
    public async sendImage(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'image', url, isReusable);
    }

    /**
     * Sends an audio attachment to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param url - The URL of the audio.
     * @param isReusable - Indicates whether the audio is reusable.
     * @returns A promise that resolves with the API response.
     */
    public async sendAudio(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'audio', url, isReusable);
    }

    /**
     * Sends a video attachment to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param url - The URL of the video.
     * @param isReusable - Indicates whether the video is reusable.
     * @returns A promise that resolves with the API response.
     */
    public async sendVideo(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'video', url, isReusable);
    }

    /**
     * Sends a file attachment to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param url - The URL of the file.
     * @param isReusable - Indicates whether the file is reusable.
     * @returns A promise that resolves with the API response.
     */
    public async sendFile(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'file', url, isReusable);
    }

    /**
     * Sets the typing indicator for a recipient.
     * @param recipientId - The ID of the recipient.
     * @param typing - Indicates whether the typing indicator should be turned on or off.
     * @returns A promise that resolves with the API response.
     */
    public async setTyping(recipientId: string, typing: boolean) {
        const body = {
            recipient: {
                id: recipientId
            },
            sender_action: typing ? 'typing_on' : 'typing_off'
        };

        return this.sendRequest({ method: 'POST', path: 'messages', body });
    }

    /**
     * Sets the persistent menu for a user.
     * @param psid - The ID of the user.
     * @param persistentMenu - The persistent menu items.
     * @returns A promise that resolves with the API response.
     */
    public async setPersistentMenu(psid: string, persistentMenu: PersistentMenuItem[]) {
        const body = {
            psid,
            persistent_menu: persistentMenu
        };

        return this.sendRequest({ method: 'POST', path: 'custom_user_settings', body });
    }

    /**
     * Retrieves the persistent menu for a user.
     * @param psid - The ID of the user.
     * @returns A promise that resolves with the API response.
     */
    public async getPersistentMenu(psid: string) {
        return this.sendRequest({ method: 'GET', path: `custom_user_settings?psid=${psid}` });
    }

    /**
     * Deletes the persistent menu for a user.
     * @param psid - The ID of the user.
     * @returns A promise that resolves with the API response.
     */
    public async deletePersistentMenu(psid: string) {
        return this.sendRequest({
            method: 'DELETE',
            path: `custom_user_settings?psid=${psid}&params=["persistent_menu"]`
        });
    }
}
