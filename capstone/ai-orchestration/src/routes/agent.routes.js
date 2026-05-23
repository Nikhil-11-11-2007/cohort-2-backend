import { Router } from "express";
import agent from "../agents/code.agent.js";

const AgentRouter = Router();

AgentRouter.post("/invoke", async (req, res) => {
    try {
        const { message, projectId } = req.body;

        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        });

        const writer = (text) => res.write(text)

        await agent.stream(
            {
                messages: [{
                    role: "user",
                    content: message
                }]
            },
            {
                context: {
                    projectId,
                    writer
                },
                streamMode: "custom"
            });

        // for await (const chunk of response) {
        //     console.log(chunk)
        //     res.write(`data: ${chunk}\n\n`);
        // }

        res.end();
    } catch (error) {
        if (res.headersSent) { res.end(); }
        else { res.status(500).json({ error: "Failed to invoke agent" }); }
    }
})

export default AgentRouter;