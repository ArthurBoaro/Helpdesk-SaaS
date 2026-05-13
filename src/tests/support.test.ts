import request from "supertest";
import { app } from "../app.js"; 
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

// Initialize app before tests
beforeAll(async () => {
    await app.ready();
});

// Close app after tests
afterAll(async () => {
    await app.close();
});


// Test for Support Flow
describe("SUPPORT FLOW", () => {
    it("should call tool and return events", async () => {
         // Create session
        const sessionResponse = await request(app.server).post("/sessions").send();
        // Get Session Id
        const sessionId = sessionResponse.body.sessionId;
        // Call Chat
        // User support message
        const chatResponse = await request(app.server).post("/chat").send({
            sessionId,
            message: "Preciso de suporte"
        });
        // User email message
        const response = await request(app.server).post("/chat").send({
                sessionId,
                message: "test@gmail.com"
        });
        // Expects Results
        expect(response.statusCode).toBe(200);
        expect(response.body.assistantMessage).toContain("Ticket");
        const hasCreateTicketEvent = response.body.events.some((event: any) => event.name === "createTicket");
        expect(hasCreateTicketEvent).toBe(true);
    });
});