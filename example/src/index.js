const { Client, Collections } = require('chat-bridge');
const { guardEnv } = require('guard-env');
const events = require('./events');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const env = guardEnv(process.env, {
    ACCESS_TOKEN: String,
    VERIFY_TOKEN: String,
    PORT: Number
});

// https://chat-bridge.pages.dev/api-reference/core/client
const client = new Client({
    accessToken: env.ACCESS_TOKEN,
    verifyToken: env.VERIFY_TOKEN,
    endpoint: '/api/webhook',
    port: env.PORT
});

// https://chat-bridge.pages.dev/api-reference/core/client#register-a-plugin
client.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

// https://chat-bridge.pages.dev/guides/event-handlers
events(client);

// http://localhost:3000/api-reference/core/collections
const commands = new Collections();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    commands.add({ ...command });
}

client.commands = commands;

// https://chat-bridge.pages.dev/api-reference/core/client#start-the-server
client.start(async () => {
    console.log(`Logged in as ${client.page.name} (${client.page.id}), listening on port ${env.PORT}`);
});
