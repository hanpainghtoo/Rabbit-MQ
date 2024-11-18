const express = require('express');
const { connectRabbitMQ, consumeUserRegistered, consumeChatMessage } = require('./rabbitmqHelper');

const app = express();

async function setupRabbitMQConsumers() {
    // Consume user_registered messages
    consumeUserRegistered((user) => {
        console.log(`Chat profile created for ${user.username}`);
    });

    // Consume chat_message messages
    consumeChatMessage((chatMessage) => {
        const { sender, recipients, message, timestamp } = chatMessage;
        recipients.forEach((recipient) => {
            console.log(`Message from ${sender} to ${recipient}: "${message}" at ${timestamp}`);
            // Add logic here to store the message or notify the user if needed
        });
    });
}

app.listen(3002, async () => {
    await connectRabbitMQ();
    setupRabbitMQConsumers();
    console.log('Chat Service running on port 3002');
});
