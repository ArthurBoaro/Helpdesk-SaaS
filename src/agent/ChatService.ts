import { detectIntent } from "./router.js";
import { searchKB } from "../tools/searchKB.js";
import { getServiceStatus } from "../tools/getServiceStatus.js";
import { MessageRepository } from "../repositories/MessageRepository.js";
import { EventRepository } from "../repositories/EventRepository.js";
import { createTicket } from "../tools/createTicket.js";


interface ChatProps {
    sessionId: string;
    content: string;
    metadata?: {
        userId?: string;
        channel?: string;
    };
}


class ChatService {
    async execute({sessionId, content, metadata}: ChatProps) {

        // Initializa variables
        const messageRepository = new MessageRepository();
        const eventRepository = new EventRepository();
        const userMessage = content;
        let status: any = {};
        let savedThoughtEvent: any = {};
        let savedToolCallEvent: any = {};
        let savedToolResultEvent: any = {};
        let savedAssistantMessage: any = {};
        let savedUserMessage: any = {};
        let toolResponse: any = {};
        let assistantMessage = "";
        let events = [];
        let type = "";
        let name = "";
        let data = {};
        let contact = "";
        let solvedSupport = false;
        const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
        
        // Save user message
        savedUserMessage = await messageRepository.create({sessionId, role: "USER", content: userMessage, metadata});
        
        // Detect Intent
        const intent = detectIntent(userMessage); 
       
        //Save Thought event
        type = "thought";
        name = "router";
        data = { intent };
        savedThoughtEvent = await eventRepository.create({sessionId, type, name, data});
        events.push(savedThoughtEvent);


        // Status Flow
        if (intent == "STATUS") {
            // Tool Call GetServiceStatus
            status = getServiceStatus();

            // Save Tool Call GetServiceStatus Event
            type = "tool_call";
            name = "getServiceStatus";
            data = {};
            savedToolCallEvent = await eventRepository.create({sessionId, type, name, data});
            events.push(savedToolCallEvent);

            // Save Tool GetServiceStatus Result Event
            type = "tool_result";
            data = status;
            savedToolResultEvent = await eventRepository.create({sessionId, type, name, data});
            events.push(savedToolResultEvent);

            // Create Assistant Message
            assistantMessage =
                `API: ${status.api}, ` +
                `Webhook: ${status.webhook}, ` +
                `Dashboard: ${status.dashboard}`;
        }


        // Support Flow
        if (intent == "SUPPORT") {
            // Tool Call SearchKB
            toolResponse = searchKB(userMessage);

            // Save Tool Call SearchKB Event
            type = "tool_call";
            name = "searchKB";
            data = {
                query: userMessage
            };
            savedToolCallEvent = await eventRepository.create({sessionId, type, name, data});
            events.push(savedToolCallEvent);

            // Save Tool Call SearchKB Result Event
            type = "tool_result";
            data = toolResponse;
            savedToolResultEvent = await eventRepository.create({sessionId, type, name, data});
            events.push(savedToolResultEvent);

            // Check if SearchKB solved
            solvedSupport = toolResponse.length > 0;
            if (solvedSupport) {

                // Create Assistant Message
                assistantMessage = toolResponse.map((article: any) => `${article.title}: ${article.summary}`).join("\n");

            } else {

                // Search Session Historic
                const previousMessages = await messageRepository.getMessagesById(sessionId);

                // Get only previous User Messages
                const previousUserMessages = previousMessages.filter(message => message.role == "USER");

                // For to check if contact exists in previous messages in the historic
                for (let message of previousUserMessages) {
                    const matchEmail = message.content.match(emailRegex)
                    if (matchEmail) {
                        contact = matchEmail[0];
                    }
                }

                // Check if contact exists
                if (!contact) {
                    // Assistant Message for missing contact
                    assistantMessage = "Qual o seu email para contato?";

                    // Save Thought Event
                    type = "thought";
                    name = "missing_information";
                    data = { "field": "contact" };
                    savedThoughtEvent = await eventRepository.create({sessionId, type, name, data});
                    events.push(savedThoughtEvent);

                } else {
                    // Tool Call Create Ticket
                    const titleTicket = userMessage;
                    const descriptionTicket = userMessage;
                    const priority = "medium";
                    toolResponse = await createTicket({title: titleTicket, description: descriptionTicket, priority, contact});
                    
                    // Save Tool Call Create Ticket Event
                    type = "tool_call";
                    name = "createTicket";
                    data = {
                        title: titleTicket,
                        description: descriptionTicket,
                        priority,
                        contact
                    };
                    savedToolCallEvent = await eventRepository.create({sessionId, type, name, data});
                    events.push(savedToolCallEvent);
                    
                    // Save Tool Call Create Ticket Result Event
                    type = "tool_result";
                    data = toolResponse;
                    savedToolResultEvent = await eventRepository.create({sessionId, type, name, data});
                    events.push(savedToolResultEvent);
                    
                    // Create Assistant Message
                    assistantMessage = `Ticket: ${toolResponse.ticketId}`;
                }
            }
        }


        

        // Save assistant message
        savedAssistantMessage = await messageRepository.create({sessionId, role: "ASSISTANT", content: assistantMessage, metadata}); 
        
        // Reply
        return {
            "sessionId": sessionId,
            "assistantMessage": assistantMessage,
            "events": events
        }
    }
}

export { ChatService }