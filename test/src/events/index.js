const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    const eventsDir = path.join(__dirname);
    const eventFiles = fs.readdirSync(eventsDir).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(path.join(__dirname, file));
        const eventHandler = (...args) => event.run(client, ...args);

        if (event.once) {
            client.once(event.name, eventHandler);
        } else {
            client.on(event.name, eventHandler);
        }
    }
};
