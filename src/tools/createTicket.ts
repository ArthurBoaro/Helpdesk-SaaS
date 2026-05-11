import prismaClient from "../prisma/index.js";

interface TicketProps {
    title: string;
    description: string;
    priority: string;
    contact: string;
}

export async function createTicket({title, description, priority, contact}: TicketProps) {
    // Create a random ticket Id
    const randomId = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
    const ticketId = "TCK-" + randomId;
    // Create ticket in the DB
    const ticket = await prismaClient.ticket.create({
        data: {
            ticketId,
            title,
            description,
            priority,
            contact
        }
    });
    // Return ticketId
    return {
        ticketId: ticket.ticketId
    }
}