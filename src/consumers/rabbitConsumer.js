const { getChannel } = require("../config/rabbitmq");
const sendEmail = require("../services/emailService");
require("dotenv").config();

const QUEUE_NAME = process.env.QUEUE_NAME;

const consumeMessages = async () => {
    const channel = getChannel();

    if (!channel) {
        console.error("RabbitMQ channel not available");
        return;
    }

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(QUEUE_NAME, async (msg) => {
        if (msg != null) {
            const emailData = JSON.parse(msg.content.toString());
            console.log("Received message: ", emailData);

            await sendEmail(emailData);
            channel.ack(msg);
        }
    });

    console.log(`Waiting for messages in ${QUEUE_NAME}....`);
};

module.exports = consumeMessages;
