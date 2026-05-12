import express from 'express';
import monrgan from 'morgan';

const app = express();

app.use(monrgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/sandbox/health", (req,res) => {
    res.status(200).json({
        message: "Sandbox API is healthy",
        status: "ok"
    })
})

export default app