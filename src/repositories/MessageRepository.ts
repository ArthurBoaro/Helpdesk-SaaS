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
                metadata
            }
        });
    }
}

export { MessageRepository }