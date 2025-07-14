const amqp = require("amqplib")
require("dotenv").config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: 'amqp',
            hostname: process.env.RABBITMQ_HOST, // e.g. 'localhost' or 'rabbitmq'
            port: 5672,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASS,
            frameMax: 8192,
        });
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable : true });
        console.log(`Connected to RabbitMQ, listening on queue: ${QUEUE_NAME}`);
    } catch (error) {
        console.error("RabbitMQ connection Error: ", error);
    }
}

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };