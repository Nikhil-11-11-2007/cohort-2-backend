import express from 'express';
import morgan from 'morgan';
import AgentRouter from './routes/agent.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());



app.get("/api/status/healthz", (req, res) => {
    res.status(200).json({
        message: "AI Orchestration API is healthy!",
        status: "success"
    })
})

app.use("/api/ai", AgentRouter)

export default app;