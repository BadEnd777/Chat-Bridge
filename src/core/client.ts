import Fastify, { FastifyRequest, FastifyReply, type FastifyInstance } from 'fastify';

import { ClientOptions, HubQuery, WebhookBody, Entry, HttpMethod, PageInformation } from '@/types';
import { Constants } from '@/core/constants';

import { EventEmitter } from 'events';
import { fastifyStatic, FastifyStaticOptions } from '@fastify/static';
import { request } from 'undici';

/**
 * @type {Client}
 * @example
 * const { Client } = require('@badend/chatbridge');
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
    private endpoint: string;
    private port: number;
    private host: string;

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
        await this.getPageInfo();

        this.server.register(fastifyStatic, {
            root: `${__dirname}/static`,
            prefix: '/'
        });
        this.server.post(this.endpoint, this.handleWebhookRequest.bind(this));
        this.server.get(this.endpoint, this.handleVerifyRequest.bind(this));

        const startServer = async () => {
            try {
                await this.server.listen({ port: this.port, host: this.host });
                if (callback) callback();
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        };

        await startServer();
    }

    /**
     * Create a static file server
     * @memberof Client
     * @example
     * client.static({
     *      root: `${__dirname}/public`,
     *      prefix: "/",
     * });
     * @param {FastifyStaticOptions} options
     */
    public async static(options: FastifyStaticOptions) {
        return this.server.register(fastifyStatic, {
            ...options,
            decorateReply: false
        });
    }

    /**
     * Register a plugin
     * @memberof Client
     * @example
     * client.register(import("@fastify/static"), {
     *      root: `${__dirname}/public`,
     *      prefix: "/",
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
            throw new Error(`Request failed: ${statusCode}`);
        }

        const responseBody = await response.json();
        return responseBody;
    }

    private sendApiMessage(recipientId: string, message: object) {
        const body = {
            recipient: {
                id: recipientId
            },
            message
        };

        return this.sendRequest({ method: 'POST', path: 'messages', body });
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
}
