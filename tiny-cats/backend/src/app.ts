import express, { type Request, type Response } from "express";

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "tiny-cat backend is running"
    })
})

// "dev": "nodemon --watch src --ext ts --exec \"node --loader ts-node/esm\" src/server.ts"

export default app