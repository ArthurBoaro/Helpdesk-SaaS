import Fastify from "fastify";
import { routes } from "./routes.js";
import cors from "@fastify/cors";


// Initialize Fastify instance with logger
const app = Fastify({logger: true});

// Create Error Handler
app.setErrorHandler((error, request, reply) => {

    // Handle application errors
    if (error instanceof Error) {
        return reply.code(400).send({ message: error.message });
    }

    // Fallback for unknown errors
    return reply.code(400).send({
        message: "Erro desconhecido."
    });
    
})

// Initialize Server
const start = async () => {

    // Initialize Cors and routes
    await app.register(cors);
    await app.register(routes);
 
    try {
        // Start Http server on port
        await app.listen({
            port: 3333,
            host: "0.0.0.0"
        })
    } catch {
        // Stop application if server fails
        process.exit(1);
    }

};

// Start application
start();