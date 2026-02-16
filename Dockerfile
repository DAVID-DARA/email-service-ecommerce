# Stage 1: Build Image (used for installing dependencies, including native ones if needed)
FROM node:20-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production Image (minimal image for runtime)
FROM node:20-slim
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy production dependencies from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY . .

# Define environment variables for RabbitMQ connection (default values can be set here)
# These will be the defaults if not overridden when running the container
ENV RABBITMQ_URL=amqp://guest:guest@localhost:15672
ENV RABBITMQ_HOST=localhost
ENV RABBITMQ_USER=guest
ENV RABBITMQ_PASS=guest
ENV QUEUE_NAME=email_queue
ENV EMAIL_USER=9b07daf8432490
ENV EMAIL_PASSWORD=c95aca78f32c7e

# Expose the port your Node.js app runs on (e.g., 3000)
EXPOSE 2040

# Command to run the application
CMD ["node", "index.js"]
