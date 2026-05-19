import {Router} from "express";
import agent from "../agents/code.agent.js";

const AgentRouter = Router();

AgentRouter.post("/invoke", async (req, res) => {
    try {
        const { message, projectId } = req.body;

        const response = await agent.invoke({
            messages: [{
                role: "user",
                content: message
            }]
        },{
            context: {
                projectId
            }
        });
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