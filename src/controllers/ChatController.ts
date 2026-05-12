import type { FastifyRequest, FastifyReply } from "fastify";
import { ChatService } from "../agent/ChatService.js";

class ChatController {
    async handle(request: FastifyRequest<{
            Body: {
                sessionId: string;
                message: string;
                metadata?: {
                    userId?: string;
                    channel?: string;
                };
            }
        }>, reply: FastifyReply) {

        // Get data from request
        const { sessionId, message, metadata } = request.body;
        // Initialize service and create session
        const chatService = new ChatService();
        const chat = await chatService.execute({sessionId, content: message, metadata});
        // Return response
        return reply.send(chat)
    }
}

export { ChatController }