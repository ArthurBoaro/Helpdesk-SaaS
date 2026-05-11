import type { FastifyRequest, FastifyReply } from "fastify";
import { detectIntent } from "./router.js";
import { searchKB } from "../tools/searchKB.js";
import { getServiceStatus } from "../tools/getServiceStatus.js";
import { MessageRepository } from "../repositories/MessageRepository.js";
import { EventRepository } from "../repositories/EventRepository.js";

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
        let assistantMessage = "";
        let events = [];
        let type = "";
        let name = "";
        let data = {};
        // Save user message
        const savedUserMessage = await messageRepository.create({sessionId, role: "USER", content: userMessage, metadata});
        // Detect Intent
        const intent = detectIntent(userMessage); 
        //Save Thought event
        type = "thought";
        name = "router";
        data = { intent };
        const savedThoughtEvent = await eventRepository.create({sessionId, type, name, data});
        events.push(savedThoughtEvent);

        
        // Status Flow
        if (intent == "STATUS") {
            // Tool Call
            status = getServiceStatus();
            // Save Tool Call Event
            type = "tool_call";
            name = "getServiceStatus";
            const savedToolCallEvent = await eventRepository.create({sessionId, type, name, data});
            events.push(savedToolCallEvent);
            // Save Tool Result Event
            type = "tool_result";
            data = status;
            const savedToolResultEvent = await eventRepository.create({sessionId, type, name, data});
            events.push(savedToolResultEvent);
            // Create Assistant Message
            assistantMessage =
                `API: ${status.api}, ` +
                `Webhook: ${status.webhook}, ` +
                `Dashboard: ${status.dashboard}`;
        }

        // Support Flow
        if (intent == "SUPPORT") {
            
        }


        // Save assistant message
        const savedAssistantMessage = await messageRepository.create({sessionId, role: "ASSISTANT", content: assistantMessage, metadata}); 
        // Reply
        return {
            "sessionId": sessionId,
            "assistantMessage": assistantMessage,
            "events": events
        }
    }
}

export { ChatService }