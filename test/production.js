// Import the Client class
// const { Client } = require('chat-bridge')
const { Client } = require('../packages')
 
// Create a new Client instance
const client = new Client({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
})
 
// Listen for 'message' events
client.on('message', (event) => {
    const { sender, message } = event
 
    // Send a text message back to the user
    client.sendTextMessage(sender.id, `You wrote: ${message.text}`)
})
 
// Start the bot
client.start(() => {
    console.log('Bot is running')
})
