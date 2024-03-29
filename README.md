<div align="center" id="about">
    <img src="https://raw.githubusercontent.com/BadEnd777/Chat-Bridge/main/.github/assets/logo.png" alt="Chat Bridge Logo" width="200" height="200" />
    <h1>Chat Bridge</h1>
    <a href="https://www.npmjs.com/package/chat-bridge">
        <img src="https://img.shields.io/npm/v/chat-bridge" alt="NPM Version">
    </a>
    <a href="https://www.npmjs.com/package/chat-bridge">
        <img src="https://img.shields.io/npm/dt/chat-bridge" alt="NPM Downloads">
    </a>
    <a href="https://github.com/BadEnd777/Chat-Bridge">
        <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBadEnd777%2FChat-Bridge&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=visit&edge_flat=false" alt="hits">
    </a>
    <a href="https://github.com/BadEnd777/Chat-Bridge/LICENSE">
        <img src="https://img.shields.io/github/license/BadEnd777/Chat-Bridge" alt="License">
    </a>
    <a href="https://github.com/BadEnd777/Chat-Bridge/CODE_OF_CONDUCT.md">
        <img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="Code of Conduct">
    </a>
    <p><strong>Chat Bridge</strong> is an npm package that simplifies the integration of Facebook Messenger webhook handling into your Node.js applications. It offers a convenient way to interact with the Messenger Platform, handling incoming messages, postbacks, quick replies, and more. 🚀</p>
</div>

### Table of Contents

-   [Table of Contents](#table-of-contents)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Documentation](#documentation)
-   [Contributing](#contributing)
-   [Acknowledgments](#acknowledgments)
-   [License](#license)

### Features

-   **Easy Integration**: Simplifies the integration of Facebook Messenger webhook handling into your Node.js applications.
-   **Incoming Events Handling**: Provides a convenient way to handle incoming events from users.
-   **Customizable**: Offers flexibility for customization according to specific application needs.
-   **Event Driven**: Built on an event-driven architecture, making it easy to listen for and respond to various events.
-   **Simple API**: Provides a straightforward API for sending messages and interacting with users.
-   **Scalable**: Designed to scale with your application, handling high volumes of incoming messages efficiently.
-   **Open Source**: Licensed under the [MIT License](LICENSE), Chat Bridge is open source and free to use.

### Installation

Ready to get started? Install Chat Bridge using [npm](https://www.npmjs.com/):

```bash
npm install chat-bridge
```

> ⚠️ **Warning**: Chat Bridge is currently in alpha, and is not yet ready for production use. We recommend that you do not use it in production until it reaches a stable release.

### Usage

```js
// Import the Client class
const { Client } = require('chat-bridge');

// Create a new client instance
const client = new Client({
    accessToken: 'YOUR_ACCESS_TOKEN',
    verifyToken: 'YOUR_VERIFY_TOKEN'
});

// Listen for incoming messages events
client.on('message', (event) => {
    const { sender, message } = event;

    // Send a text message back to the sender
    client.sendTextMessage(sender.id, `You wrote: ${message.text}`);
});

// Start the client
client.start(async () => {
    console.log(`Listening on ${client.page.name} (${client.page.id})`);
});
```

### Documentation

You can read additional documents at [Chat Bridge](https://chat-bridge.pages.dev/)

### Contributing

We welcome contributions!

Fixing a bug, adding a new feature, or improving the documentation — we're always happy to see your work.

Read up on our [contributing guidelines](CONTRIBUTING.md) and then check out one of our [issues](https://github.com/BadEnd777/Chat-Bridge/issues).

### Acknowledgments

-   [fastify](https://www.fastify.io/) — Fast and low overhead web framework, for Node.js
-   [undici](https://undici.nodejs.org/) — HTTP/1.1 client, written from scratch for Node.js

### License

Chat Bridge [is licensed under the MIT License](LICENSE) unless otherwise specified.

---
