import express from 'express';
import morgan from 'morgan';
import AgentRouter from './routes/agent.routes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("REQUEST RECEIVED");
    console.log(req.method, req.url);
    console.log(req.body);
    next();
});

app.use(morgan('dev'));


app.get("/api/status/healthz", (req, res) => {
    res.status(200).json({
        message: "AI Orchestration API is healthy!",
        status: "success"
    })
})

app.use("/api/ai", AgentRouter)

export default app;