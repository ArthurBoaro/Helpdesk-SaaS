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
    // Function to get Session Messages and Events with SessionId in the DB with Prisma
    async get({sessionId}: SessionProps) {
        return prismaClient.session.findUnique({
            where: {sessionId: sessionId},
            include: {
                messages: true,
                events: true
            }
        });
    }
}

export { SessionRepository }