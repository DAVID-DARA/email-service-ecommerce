const amqp = require("amqplib")
require("dotenv").config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

let channel;

const conenctRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable : true });
        console.log(`Connected to RabbitMQ, listening on queue: ${QUEUE_NAME}`);
    } catch (error) {
        console.error("RabbitMQ connection Error: ", error);
    }
}

const getChannel = () => channel;

module.exports = { conenctRabbitMQ, getChannel };