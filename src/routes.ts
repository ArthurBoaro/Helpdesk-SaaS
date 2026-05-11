import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { SessionController } from "./controllers/SessionController.js";

export async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {

    // POST /sessions endpoint
    fastify.post("/sessions", async (request: FastifyRequest, reply: FastifyReply) => {
        return new SessionController().handle(request, reply);
    });

};