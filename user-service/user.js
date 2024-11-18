const express = require('express');
const { connectRabbitMQ, getChannel } = require('./rabbitmqHelper');
const controller = require('./controller')
const app = express();
app.use(express.json());

app.post('/register',controller.register);

app.post('/sendMessage', controller.sendmessage);

app.listen(3001, async () => {
    await connectRabbitMQ();
    console.log('User Service running on port 3001');
});
