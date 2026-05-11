import prismaClient from "../prisma/index.js";

interface EventProps {
    sessionId: string;
    type: string;
    name: string;
    data: any;

}

class EventRepository {
    // Function to create Event in the DB with prisma
    async create({sessionId, type, name, data}: EventProps) {
        return prismaClient.event.create({
            data: {
                sessionId,
                type,
                name,
                data
            }
        });
    }
}

export { EventRepository }