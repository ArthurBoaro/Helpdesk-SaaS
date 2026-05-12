import type { FastifyRequest, FastifyReply } from "fastify";
import { GetSessionMessages } from "../services/GetSessionMessages.js";

class SessionMessagesController {
    async handle(request: FastifyRequest<{
            Params: {
                sessionId: string;
            }
        }>, reply: FastifyReply) {

        // Initialize instance and get session messages
        const sessionId = request.params.sessionId;
        const getSessionMessages = new GetSessionMessages();
        const sessionMessages = await getSessionMessages.execute({sessionId});
        // Return response
        return reply.send(sessionMessages);
    }
}

export { SessionMessagesController }