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

function getChannel() {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized. Please call connectRabbitMQ() first.');
    }
    return channel;
}

async function closeRabbitMQ() {
    if (connection) {
        await connection.close();
        console.log('RabbitMQ connection closed');
    }
}

module.exports = { connectRabbitMQ, getChannel, closeRabbitMQ };
