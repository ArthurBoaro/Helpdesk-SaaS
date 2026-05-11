import type { FastifyRequest, FastifyReply } from "fastify";
import { CreateSessionService } from "../services/CreateSessionService.js";

class SessionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        // Initialize service and create session
        const sessionService = new CreateSessionService();
        const session = await sessionService.execute();
        // Return response
        return reply.send(session);
    }
}

export { SessionController }