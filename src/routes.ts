import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { SessionController } from "./controllers/SessionController.js";
import { ChatController } from "./controllers/ChatController.js";
import { SessionMessagesController } from "./controllers/SessionMessagesController.js";

export async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {

    // POST /sessions endpoint
    fastify.post("/sessions", async (request: FastifyRequest, reply: FastifyReply) => {
        return new SessionController().handle(request, reply);
    });

    // POST /chat endpoint
    fastify.post("/chat", async (request: FastifyRequest<{
            Body: {
                sessionId: string;
                message: string;
                metadata?: {
                    userId?: string;
                    channel?: string;
                };
            }
        }>, reply: FastifyReply) => {
        return new ChatController().handle(request, reply);
    });

    // GET /sessions/:sessionId/messages endpoint
    fastify.get("/sessions/:sessionId/messages", async (request: FastifyRequest<{
            Params: {
                sessionId: string;
            }
        }>, reply: FastifyReply) => {
        return new SessionMessagesController().handle(request, reply);
    });
};