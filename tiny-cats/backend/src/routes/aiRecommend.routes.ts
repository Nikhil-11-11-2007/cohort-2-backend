import express from "express"
import { aiRecommendController } from "../controller/aiRecommend.controller.ts"

const router = express.Router()

//need to validate all apis using validator using zod(zos is useful for typescript) ya express-validator 

router.post("/recommendByAi", aiRecommendController)

export default router