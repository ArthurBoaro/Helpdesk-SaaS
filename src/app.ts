import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes.js";

// Initialize Fastify instance with logger
export const app = Fastify({logger: true});

// Initialize Cors and routes
await app.register(cors);
await app.register(routes);

// Create Error Handler
app.setErrorHandler((error, request, reply) => {

    // Handle application errors
    if (error instanceof Error) {
        return reply.code(400).send({
            message: error.message
        });
    }
    // Fallback for unknown errors
    return reply.code(400).send({
        message: "Unknown error"
    });

});