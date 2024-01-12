import { Client } from '../../typescript/src/core/client';
import { fastifyStatic } from '@fastify/static';

describe('Client', () => {
    let client: Client;

    beforeAll(() => {
        const options = {
            accessToken: process.env.ACCESS_TOKEN,
            verifyToken: process.env.VERIFY_TOKEN,
            // Add other options as needed
        };
        client = new Client(options);
        console.log('Initializing client');

        client.start();
        console.log('Server started');
    });

    afterAll(async () => {
        await client.server.close();
        console.log('Server closed');
    });

    it('should handle verify request correctly', async () => {
        const requestMock = {
            query: {
                'hub.mode': 'subscribe',
                'hub.challenge': '12345',
                'hub.verify_token': process.env.VERIFY_TOKEN,
            },
        };
        const replyMock = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        client['handleVerifyRequest'](requestMock as any, replyMock as any);

        expect(replyMock.code).toHaveBeenCalledWith(200);
        expect(replyMock.send).toHaveBeenCalledWith('12345');
    });

    it('should handle webhook request correctly', async () => {
        const requestMock = {
            body: {
                object: 'page',
                entry: [
                    {
                        messaging: [
                            {
                                message: {
                                    quick_reply: {},
                                },
                            },
                        ],
                    },
                ],
            },
        };
        const replyMock = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        client.emit = jest.fn();

        client['handleWebhookRequest'](requestMock as any, replyMock as any);

        expect(replyMock.code).toHaveBeenCalledWith(200);
        expect(replyMock.send).toHaveBeenCalledWith('OK');
        expect(client.emit).toHaveBeenCalledWith('quick_reply', requestMock.body.entry[0].messaging[0]);
    });

    it('should start the server', async () => {
        client.getPageInfo = jest.fn().mockResolvedValueOnce({});
        client.server.listen = jest.fn().mockResolvedValueOnce({});
        const callback = jest.fn();

        await client.start(callback);

        expect(client.getPageInfo).toHaveBeenCalled();
        expect(client.server.listen).toHaveBeenCalledWith({ port: client.port, host: client.host });
        expect(callback).toHaveBeenCalled();
    });

    it('should send API message', async () => {
        const recipientId = 'recipient-id';
        const message = { text: 'Hello, world!' };

        client['sendRequest'] = jest.fn().mockResolvedValueOnce({});

        await client.sendApiMessage(recipientId, message);

        expect(client['sendRequest']).toHaveBeenCalledWith({
            method: 'POST',
            path: 'messages',
            body: { recipient: { id: recipientId }, message },
        });
    });

    it('should send text message', async () => {
        const recipientId = 'recipient-id';
        const text = 'Hello, world!';

        client.sendApiMessage = jest.fn().mockResolvedValueOnce({});

        await client.sendTextMessage(recipientId, text);

        expect(client.sendApiMessage).toHaveBeenCalledWith(recipientId, { text });
    });

    it('should send attachment', async () => {
        const recipientId = 'recipient-id';
        const type = 'image';
        const url = 'https://example.com/image.png';
        const isReusable = true;

        client.sendApiMessage = jest.fn().mockResolvedValueOnce({});

        await client.sendAttachment(recipientId, type, url, isReusable);

        expect(client.sendApiMessage).toHaveBeenCalledWith(recipientId, {
            attachment: {
                type,
                payload: {
                    url,
                    is_reusable: isReusable,
                },
            },
        });
    });

    const testAttachment = [
        {
            method: 'sendImage',
            type: 'image',
            extension: 'png',
        },
        {
            method: 'sendAudio',
            type: 'audio',
            extension: 'mp3',
        },
        {
            method: 'sendVideo',
            type: 'video',
            extension: 'mp4',
        },
        {
            method: 'sendFile',
            type: 'file',
            extension: 'pdf',
        },
    ];

    testAttachment.forEach((attachment) => {
        it(`should send ${attachment.type}`, async () => {
            const recipientId = 'recipient-id';
            const url = `https://example.com/${attachment.type}.${attachment.extension}`;
            const isReusable = true;

            client.sendAttachment = jest.fn().mockResolvedValueOnce({});

            await client[attachment.method](recipientId, url, isReusable);

            expect(client.sendAttachment).toHaveBeenCalledWith(recipientId, attachment.type, url, isReusable);
        });
    });

    const testTyping = [
        {
            method: 'setTyping',
            typing: true,
            action: 'typing_on',
        },
        {
            method: 'setTyping',
            typing: false,
            action: 'typing_off',
        },
    ];

    testTyping.forEach((typing) => {
        it(`should set typing ${typing.typing}`, async () => {
            const recipientId = 'recipient-id';

            client['sendRequest'] = jest.fn().mockResolvedValueOnce({});

            await client[typing.method](recipientId, typing.typing);

            expect(client['sendRequest']).toHaveBeenCalledWith({
                method: 'POST',
                path: 'messages',
                body: {
                    recipient: {
                        id: recipientId,
                    },
                    sender_action: typing.action,
                },
            });
        });
    });
});
