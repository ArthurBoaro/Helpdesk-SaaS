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


// Test for Status Flow
describe("STATUS FLOW", () => {
    it("should call tool and return events", async () => {
        // Create session
        const sessionResponse = await request(app.server).post("/sessions").send();
        // Get Session Id
        const sessionId = sessionResponse.body.sessionId;
        // Call Chat
        const chatResponse = await request(app.server).post("/chat").send({
            sessionId,
            message: "Qual o status do sistema?"
        });
        // Expects Results
        expect(chatResponse.statusCode).toBe(200);
        expect(chatResponse.body.assistantMessage).toContain("API");
        expect(chatResponse.body.events.length).toBeGreaterThan(0);
        const hasToolCall = chatResponse.body.events.some((event: any) => event.name == "getServiceStatus");
        expect(hasToolCall).toBe(true);
    });
});