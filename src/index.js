const express = require("express");
const { connectRabbitMQ} = require("./config/rabbitmq");
const consumeMessages = require("./consumers/rabbitConsumer");

const app = express();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectRabbitMQ();
    await consumeMessages();

    app.get("/", (req, res) => {
        res.send("Email service is running ✅");
    });

    app.listen(PORT, () => {
        console.log(`Email service running on port ${PORT}`);
    });
};

startServer();

// RUN COMMAND DOCKER
// docker run -d --hostname rabbitmq-host --name rabbitmq2 -p 5672:5672 -p 15672:15672 rabbitmq:latest