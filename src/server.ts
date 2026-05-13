import { app } from "./app.js";

const start = async () => {
    // Start Http server on port
    try {
        await app.listen({
            port: 3333,
            host: "0.0.0.0"
        });
    // Stop application if server fails
    } catch {
        process.exit(1);
    }

};
// Start server
start();