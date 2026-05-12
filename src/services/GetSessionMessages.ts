import { SessionRepository } from "../repositories/SessionRepository.js";

interface SessionMessagesProps {
    sessionId: string;
}

class GetSessionMessages {
    async execute({sessionId}: SessionMessagesProps) {
            // Get Session Messages in the DB using repository instance
            const repository = new SessionRepository();
            const sessionMessages = await repository.get({
                sessionId
            });
            // Return Session Messages
            return sessionMessages;
        }
}

export { GetSessionMessages }