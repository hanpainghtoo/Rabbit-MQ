// rabbitmqHelper.js
const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';

let connection;
let channel;

async function connectRabbitMQ() {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('user_registered');
    await channel.assertQueue('chat_message');
    console.log('Connected to RabbitMQ');
}

function consumeUserRegistered(callback) {
    if (!channel) throw new Error('RabbitMQ channel not initialized.');
    channel.consume('user_registered', (msg) => {
        const user = JSON.parse(msg.content.toString());
        callback(user);
        channel.ack(msg);
    });
}

function consumeChatMessage(callback) {
    if (!channel) throw new Error('RabbitMQ channel not initialized.');
    channel.consume('chat_message', (msg) => {
        const chatMessage = JSON.parse(msg.content.toString());
        callback(chatMessage);
        channel.ack(msg);
    });
}

async function closeRabbitMQ() {
    if (connection) {
        await connection.close();
        console.log('RabbitMQ connection closed');
    }
}

module.exports = { connectRabbitMQ, consumeUserRegistered, consumeChatMessage, closeRabbitMQ };
