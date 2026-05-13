import prismaClient from "../prisma/index.js";

interface MessageProps {
    sessionId: string;
    role: "USER" | "ASSISTANT";
    content: string;
    metadata?: {
        userId?: string;
        channel?: string;
    } | undefined;
}

class MessageRepository {
    // Function to create Message in the DB with Prisma
    async create({sessionId, role, content, metadata}: MessageProps) {
        return prismaClient.message.create({
            data: {
                sessionId,
                role,
                content,
                metadata: metadata ?? null
            }
        });
    }
    // Function to get Messages by Id in the DB with Prisma
    async getMessagesById(sessionId: string) {
        return prismaClient.message.findMany({
            where: {sessionId: sessionId},
            orderBy: {created_at: "asc"}
        });
    }
}

export { MessageRepository }