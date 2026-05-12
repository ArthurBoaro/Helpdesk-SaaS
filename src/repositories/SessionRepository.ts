import prismaClient from "../prisma/index.js";

interface SessionProps {
    sessionId: string;
}

class SessionRepository {
    // Function to create Session in the DB with Prisma
    async create({sessionId}: SessionProps) {
        return prismaClient.session.create({
            data: {
                sessionId
            }
        });
    }
    // Function to get Session Messages with SessionId in the DB with Prisma
    async get({sessionId}: SessionProps) {
        return prismaClient.message.findMany({
            where: {sessionId: sessionId}
        });
    }
}

export { SessionRepository }