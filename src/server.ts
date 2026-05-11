import Fastify from "fastify";
import { routes } from "./routes.js";
import cors from "@fastify/cors";

const app = Fastify({logger: true});

app.setErrorHandler((error, request, reply) => {

    if (error instanceof Error) {
        return reply.code(400).send({ message: error.message });
    }

    return reply.code(400).send({
        message: "Erro desconhecido"
    });
    
})

const start = async () => {

    await app.register(cors);
    await app.register(routes);


    try {
        await app.listen({port: 3333})
    } catch {
        process.exit(1);
    }



};

start();