const { connectRabbitMQ, getChannel } = require('./rabbitmqHelper');

exports.register = async (req, res) => {
    const { username, email } = req.body;
    const user = { username, email };

    // Publish user registration message to RabbitMQ
    const channel = getChannel();
    await channel.sendToQueue('user_registered', Buffer.from(JSON.stringify(user)));
    console.log(`User registration event sent for ${username}`);
    
    res.status(201).json({ message: 'User registered successfully' });
}

exports.sendmessage = async (req, res) => {
    const { sender, recipients, message } = req.body;
    const chatMessage = { sender, recipients, message, timestamp: new Date() };

    // Publish chat message to the 'chat_message' queue
    const channel = getChannel();
    await channel.sendToQueue('chat_message', Buffer.from(JSON.stringify(chatMessage)));
    console.log(`Message from ${sender} sent to ${recipients.join(', ')}: "${message}"`);

    res.status(200).json({ message: 'Message sent successfully' });
}