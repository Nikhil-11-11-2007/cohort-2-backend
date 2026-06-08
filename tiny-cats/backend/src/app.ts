import express, { type Request, type Response } from "express";
import catRoutes from "./routes/cat.routes.ts"
import aiRoutes from "./routes/ai.routes.ts"
import aiRecommend from "./routes/aiRecommend.routes.ts"
import mcpRoutes from "./routes/test-mcp.routes.ts"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "tiny-cat backend is running"
    })
})

app.use("/api/cats", catRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/aiRecommend", aiRecommend)
app.use("/api/mcp", mcpRoutes)

export default app