module.exports = {
    name: 'client',

    run: async (client, message) => {
        const sender = message.sender.id;

        // https://chat-bridge.pages.dev/api-reference/core/client#send-an-api-message
        await client.sendApiMessage(sender, {
            text: 'From: sendApiMessage',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'Hello',
                    payload: 'HELLO'
                }
            ]
        });

        // http://localhost:3000/api-reference/core/client#send-an-api-message
        await client.send(sender, {
            text: 'From: send',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'Hello',
                    payload: 'HELLO'
                }
            ]
        });

        // https://chat-bridge.pages.dev/api-reference/core/client#get-page-information
        const page = await client.getPageInfo();
        await client.sendTextMessage(sender, `Page: ${page.name}, (${page.id})`);

        // https://chat-bridge.pages.dev/api-reference/core/client#send-a-text-message
        await client.sendTextMessage(sender, 'From: sendText');

        const types = [
            {
                type: 'image',
                url: 'https://file-examples.com/storage/fe63e96e0365c0e1e99a842/2017/10/file_example_JPG_2500kB.jpg'
            },
            {
                type: 'audio',
                url: 'https://file-examples.com/storage/fe63e96e0365c0e1e99a842/2017/11/file_example_OOG_5MG.ogg'
            },
            {
                type: 'video',
                url: 'https://file-examples.com/storage/fe63e96e0365c0e1e99a842/2017/04/file_example_MP4_1920_18MG.mp4'
            },
            {
                type: 'file',
                url: 'https://file-examples.com/storage/fe63e96e0365c0e1e99a842/2017/10/file-example_PDF_1MB.pdf'
            }
        ];

        // https://chat-bridge.pages.dev/api-reference/core/client#send-an-attachment
        for (const type of types) {
            await client.sendAttachment(sender, type.type, type.url);
        }

        // https://chat-bridge.pages.dev/api-reference/core/client#send-an-image
        await client.sendImage(sender, types[0].url);

        // https://chat-bridge.pages.dev/api-reference/core/client#send-an-audio-file
        await client.sendAudio(sender, types[1].url);

        // https://chat-bridge.pages.dev/api-reference/core/client#send-a-video
        await client.sendVideo(sender, types[2].url);

        // https://chat-bridge.pages.dev/api-reference/core/client#send-a-file
        await client.sendFile(sender, types[3].url);

        // https://chat-bridge.pages.dev/api-reference/core/client#set-typing-indicator
        await client.setTyping(sender, true);
        setTimeout(() => {
            client.setTyping(sender, false);
        }, 3000);
    }
};
