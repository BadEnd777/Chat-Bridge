// development.ts
import { Client, Collections } from "../typescript/src";
import 'dotenv/config'

const client = new Client({
    accessToken: process.env.ACCESS_TOKEN as string,
    verifyToken: process.env.VERIFY_TOKEN as string,
    endpoint: "/api/webhook"
});

const collection = new Collections<{ id: string }>();

(async () => {
    client.start(() => console.log('Server started'));

    console.log('endpoint', client.endpoint);
    console.log('port', client.port);
    console.log('host', client.host);

    console.log('page', client.page);

    await client.static({
        root: `${__dirname}/public`,
        prefix: "/static",
    });
    console.log('static', `http://localhost:${client.port}/static/`);

    client.on("message", async (event) => {
        console.log('message event', event);

        if (event.message?.text === '!collections') {
            const textCollection = async (data: string) => await client.sendApiMessage(event.sender.id, { text: data });
            await textCollection('collection');
            await textCollection(JSON.stringify(collection.getAll()));
            collection.add({ id: '1' });
            await textCollection(`add 1\n${JSON.stringify(collection.getAll())}`);
            collection.add({ id: '2' });
            await textCollection(`add 2\n${JSON.stringify(collection.getAll())}`);
            collection.add({ id: '3' });
            await textCollection(`add 3\n${JSON.stringify(collection.getAll())}`);

            await textCollection(`getAll\n${JSON.stringify(collection.getAll())}`);
            await textCollection(`get 2\n${JSON.stringify(collection.get('2'))}`);
            await textCollection(`get 4\n${JSON.stringify(collection.get('4'))}`);
            collection.remove('2');
            await textCollection(`remove 2\n${JSON.stringify(collection.getAll())}`);
            collection.removeAll();
            await textCollection(`removeAll\n${JSON.stringify(collection.getAll())}`);
        } else if (event.message?.text === '!send') {
            await client.sendApiMessage(event.sender.id, { text: 'sendApiMessage' });
            await client.send(event.sender.id, { text: 'send' });
            const page = await client.getPageInfo();
            await client.sendApiMessage(event.sender.id, { text: `getPageInfo\npage: ${JSON.stringify(page)}` });
            await client.sendTextMessage(event.sender.id, 'sendTextMessage');
            const attachment = [
                { type: 'image', url: 'https://cdn.discordapp.com/attachments/1082890782471639091/1194112633419354183/chat-bridge-clean.png' },
                { type: 'audio', url: 'https://cdn.discordapp.com/attachments/1178943190850617419/1185168638714593343/PPR.mp3' },
                { type: 'video', url: 'https://cdn.discordapp.com/attachments/1079792251175186516/1192022390360784967/0103.mp4' },
                { type: 'file', url: 'https://cdn.discordapp.com/attachments/1180103273173229598/1192339151480160337/CopyBlendShapes.cs' }
            ];
            for (const { type, url } of attachment) {
                await client.sendAttachment(event.sender.id, type, url);
            }
            await client.sendImage(event.sender.id, attachment[0].url);
            await client.sendAudio(event.sender.id, attachment[1].url);
            await client.sendVideo(event.sender.id, attachment[2].url);
            await client.sendFile(event.sender.id, attachment[3].url);

            await client.setTyping(event.sender.id, true);
            new Promise((resolve) => setTimeout(resolve, 5000)).then(() => client.setTyping(event.sender.id, false));
        } else if (event.message?.text === '!quick_reply') {
            await client.sendApiMessage(event.sender.id, quickReply);
        } else if (event.message?.text === '!template') {
            await client.sendApiMessage(event.sender.id, template);
        } else if (event.message?.text === '!generic') {
            await client.sendApiMessage(event.sender.id, generic);
        } else if (event.message?.text === '!receipt') {
            await client.sendApiMessage(event.sender.id, receipt);
        }
    });

    client.on("quick_reply", (event) => {
        console.log('quick_reply', event);
        client.sendApiMessage(event.sender.id, { text: `quick_reply\npayload: ${event.message?.quick_reply?.payload}` });
    });
    client.on("postback", (event) => console.log('postback', event));
    // client.on("template", (event) => console.log('template', event));
    client.on("error", (error) => console.error(error));
})().catch(console.error);

const quickReply = {
    text: 'Hello, World!',
    quick_replies: [
        { content_type: 'text', title: 'Hello', payload: 'HELLO' },
        { content_type: 'text', title: 'World', payload: 'WORLD' },
    ]
};

const template = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: 'Hello, World!',
            buttons: [
                { type: 'web_url', url: 'https://google.com', title: 'Google' },
                { type: 'postback', title: 'Postback', payload: 'POSTBACK' },
            ],
        },
    },
};

const generic = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [
                {
                    title: 'Hello',
                    subtitle: 'World',
                    image_url: 'https://cdn.discordapp.com/attachments/1082890782471639091/1194112633419354183/chat-bridge-clean.png',
                    buttons: [
                        { type: 'web_url', url: 'https://google.com', title: 'Google' },
                        { type: 'postback', title: 'Postback', payload: 'POSTBACK' },
                    ],
                },
            ],
        },
    },
};

const receipt = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'receipt',
            recipient_name: 'John Doe',
            order_number: '12345678902',
            currency: 'USD',
            payment_method: 'Visa 1234',
            timestamp: '1428444852',
            elements: [
                {
                    title: 'Hello',
                    subtitle: 'World',
                    quantity: 1,
                    price: 10,
                    currency: 'USD',
                    image_url: 'https://cdn.discordapp.com/attachments/1082890782471639091/1194112633419354183/chat-bridge-clean.png',
                },
                {
                    title: 'Hello',
                    subtitle: 'World',
                    quantity: 1,
                    price: 10,
                    currency: 'USD',
                    image_url: 'https://cdn.discordapp.com/attachments/1082890782471639091/1194112633419354183/chat-bridge-clean.png',
                },
            ],
            address: {
                street_1: '1 Hacker Way',
                street_2: '',
                city: 'Menlo Park',
                postal_code: '94025',
                state: 'CA',
                country: 'US',
            },
            summary: {
                subtotal: 20,
                shipping_cost: 4.95,
                total_tax: 3.96,
                total_cost: 20,
            },
            adjustments: [
                {
                    name: 'New Customer Discount',
                    amount: 20,
                },
                {
                    name: '$10 Off Coupon',
                    amount: 10,
                },
            ],
        },
    },
};