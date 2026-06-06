import express from "express"
import { askAiController } from "../controller/ai.controller.ts"

const router = express.Router()

//need to validate all apis using validator using zod(zos is useful for typescript) ya express-validator 

router.post("/ask", askAiController)

export default router