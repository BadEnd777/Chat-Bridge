import { EventEmitter } from 'events';
import Fastify, { FastifyReply, FastifyRequest, type FastifyInstance } from 'fastify';
import { request } from 'undici';
import { PersistentMenuItem } from '../elements/PersistentMenu';
import { ClientOptions, Entry, HubQuery, PageInformation, WebhookBody } from '../interfaces';
import { HttpMethod } from '../types';
import { Constants } from './constants';

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
export class Client extends EventEmitter {
    public server: FastifyInstance;
    private accessToken: string;
    private verifyToken: string;
    public endpoint: string;
    public port: number;
    public host: string;

    public page: PageInformation = {
        name: '',
        id: ''
    };

    constructor(options: ClientOptions) {
        super();

        this.server = Fastify();
        this.accessToken = options.accessToken;
        this.verifyToken = options.verifyToken;
        this.endpoint = options.endpoint || '/webhook';
        this.port = options.port || 8080;
        this.host = options.host || 'localhost';
    }

    private handleVerifyRequest(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as HubQuery;
        const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': verifyToken } = query;

        if (mode !== 'subscribe') return reply.code(400).send('Bad Request');
        if (verifyToken !== this.verifyToken) return reply.code(403).send('Forbidden');

        return reply.code(200).send(challenge);
    }

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
     * Start the server
     * @memberof Client
     * @example
     * client.start(async () => console.log(`Listening on ${client.page.name} (${client.page.id})`));
     * @param {Function} [callback]
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
     * Register a plugin
     * @memberof Client
     * @example
     * client.register(require('fastify-cors'), {
     *      origin: '*',
     * });
     * @param {Function} ...args
     */
    public async register(...args: Parameters<FastifyInstance['register']>) {
        return this.server.register(...args);
    }

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
    public send(recipientId: string, message: object) {
        return this.sendApiMessage(recipientId, message);
    }

    /**
     * Get page information
     * @memberof Client
     * @example
     * const pageInformation = await client.getPageInfo();
     * console.log(pageInformation);
     * @returns
     * { name: "Page Name", id: "PAGE_ID" }
     */
    public async getPageInfo(): Promise<Pick<PageInformation, 'name' | 'id'>> {
        const body = await this.sendRequest({ method: 'GET' });
        const { name, id } = body as PageInformation;
        this.page.name = name;
        this.page.id = id;

        return { name, id };
    }

    /**
     * Send a text message
     * @memberof Client
     * @example
     * client.sendTextMessage("USER_ID", "Hello World!");
     * @param {string} recipientId
     * @param {string} text
     */
    public async sendTextMessage(recipientId: string, text: string) {
        return this.sendApiMessage(recipientId, { text });
    }

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
     * Send an image
     * @memberof Client
     * @example
     * client.sendImage("USER_ID", "https://example.com/image.png");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    public async sendImage(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'image', url, isReusable);
    }

    /**
     * Send an audio
     * @memberof Client
     * @example
     * client.sendAudio("USER_ID", "https://example.com/audio.mp3");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    public async sendAudio(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'audio', url, isReusable);
    }

    /**
     * Send a video
     * @memberof Client
     * @example
     * client.sendVideo("USER_ID", "https://example.com/video.mp4");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    public async sendVideo(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'video', url, isReusable);
    }

    /**
     * Send a file
     * @memberof Client
     * @example
     * client.sendFile("USER_ID", "https://example.com/file.pdf");
     * @param {string} recipientId
     * @param {string} url
     * @param {boolean} [isReusable=false]
     */
    public async sendFile(recipientId: string, url: string, isReusable: boolean = false) {
        return this.sendAttachment(recipientId, 'file', url, isReusable);
    }

    /**
     * Set typing indicator
     * @memberof Client
     * @example
     * client.setTyping("USER_ID", true);
     * @param {string} recipientId
     * @param {boolean} typing
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
    public async setPersistentMenu(psid: string, persistentMenu: PersistentMenuItem[]) {
        const body = {
            psid,
            persistent_menu: persistentMenu
        };

        return this.sendRequest({ method: 'POST', path: 'custom_user_settings', body });
    }

    /**
     * Get persistent menu
     * @memberof Client
     * @example
     * client.getPersistentMenu("12345");
     * @param {string} psid
     */
    public async getPersistentMenu(psid: string) {
        return this.sendRequest({ method: 'GET', path: `custom_user_settings?psid=${psid}` });
    }

    /**
     * Delete persistent menu
     * @memberof Client
     * @example
     * client.deletePersistentMenu("12345");
     * @param {string} psid
     */
    public async deletePersistentMenu(psid: string) {
        return this.sendRequest({
            method: 'DELETE',
            path: `custom_user_settings?psid=${psid}&params=["persistent_menu"]`
        });
    }
}
