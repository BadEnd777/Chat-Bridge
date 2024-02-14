const { ButtonTemplate, CallButton, PostbackButton, UrlButton } = require('chat-bridge');

module.exports = {
    name: 'button',

    run: async (client, message) => {
        const sender = message.sender.id;

        // http://chat-bridge.pages.dev/api-reference/templates/button
        const buttonTemplate = new ButtonTemplate('Hello, World!').addButtons([
            // http://chat-bridge.pages.dev/api-reference/button
            new CallButton('Call Button', '+6281234567890'),
            new PostbackButton('Postback Button', 'postback'),
            new UrlButton('Url Button', 'https://chat-bridge.pages.dev/')
        ]);

        await client.send(sender, buttonTemplate);
    }
};
