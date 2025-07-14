const express = require("express");
const { conenctRabbitMQ, connectRabbitMQ} = require("./config/rabbitmq");
const consumeMessages = require("./consumers/rabbitConsumer");

const app = express();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectRabbitMQ();
    await consumeMessages();

    app.listen(PORT, () => {
        console.log(`Email service runnig on port ${PORT}`);
    });
};

startServer();