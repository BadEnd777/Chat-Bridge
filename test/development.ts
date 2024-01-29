// development.ts
import { Client, Collections, QuickReplies, QuickReply, ButtonTemplate, CallButton, PostbackButton, UrlButton } from "../typescript/src";
import { config } from "dotenv";

config();

const { ACCESS_TOKEN, VERIFY_TOKEN } = process.env;

if (!ACCESS_TOKEN || !VERIFY_TOKEN) {
    throw new Error('ACCESS_TOKEN or VERIFY_TOKEN not found');
}

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

    client.on("message", async (event) => {
        console.log('message event', event);

        if (event.message?.text === '!collections') {
            const textCollection = async (data: string) => await client.send(event.sender.id, { text: data });
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
            await client.send(event.sender.id, { text: 'send' });
            await client.send(event.sender.id, { text: 'send' });
            const page = await client.getPageInfo();
            await client.send(event.sender.id, { text: `getPageInfo\npage: ${JSON.stringify(page)}` });
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
            const quickReplies = new QuickReplies('Select an option:')
                .addQuickReply([
                    new QuickReply('Option 1')
                        .setPayload('option_1')
                        .setImageUrl('https://cdn.discordapp.com/attachments/1082890782471639091/1194112633419354183/chat-bridge-clean.png'),
                    new QuickReply('Option 2')
                        .setPayload('option_2')
                ]);

            await client.send(event.sender.id, quickReplies);
        } else if (event.message?.text === '!button') {
            const buttonTemplate = new ButtonTemplate('What do you want to do next?')
                .addButtons([
                    new CallButton('Call Button', '+6281234567890'),
                    new PostbackButton('Postback Button', 'postback'),
                    new UrlButton('Url Button', 'https://chat-bridge.pages.dev/')
                ]);

            await client.send(event.sender.id, buttonTemplate);
        }
    });

    client.on("quick_reply", (event) => {
        console.log('quick_reply', event);
        client.send(event.sender.id, { text: `quick_reply\npayload: ${event.message?.quick_reply?.payload}` });
    });
    client.on("postback", (event) => console.log('postback', event));
    // client.on("template", (event) => console.log('template', event));
    client.on("error", (error) => console.error(error));
})().catch(console.error);
