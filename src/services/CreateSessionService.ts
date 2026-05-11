import { randomUUID } from "node:crypto";
import { SessionRepository } from "../repositories/SessionRepository.js";


class CreateSessionService {
    async execute() {
        // Create a Session in the DB using repository instance with a random generated UUID
        const repository = new SessionRepository();
        const sessionId = randomUUID();
        const session = await repository.create({
            sessionId
        });
        // Return only SessionId
        return {
            sessionId: session.sessionId
        };
    }
}

export { CreateSessionService }