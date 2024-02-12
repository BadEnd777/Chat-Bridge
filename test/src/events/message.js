module.exports = {
    name: 'message',

    run: async (client, message) => {
        const {
            message: { text }
        } = message;

        const command = client.commands.get(text);

        if (!command) return;

        try {
            await command.run(client, message);
        } catch (error) {
            console.error(error);
        }
    }
};
