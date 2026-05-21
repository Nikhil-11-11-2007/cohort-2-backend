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

        const response = await agent.stream(
            {
                messages: [{
                    role: "user",
                    content: message
                }]
            },
            {
                context: {
                    projectId
                },
                streamMode: "custom"
            });

        for await (const chunk of response) {
            console.log(chunk)
            res.write(`data: ${chunk}\n\n`);
        }

        res.json({
            success: true,
            response,
        });
    } catch (error) {
        console.error("Error invoking agent:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
})

export default AgentRouter;