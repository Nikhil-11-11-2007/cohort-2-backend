import dotenv from "dotenv";

dotenv.config();
import {ChatMistralAI} from "@langchain/mistralai"
import { createAgent } from "langchain"
import { listFiles, readFiles, updateFiles } from "./tools.js"

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRALAI_API_KEY,
    "temperature": 0.7,
})

const agent = createAgent({
    model,
    tools: [
        listFiles,
        readFiles,
        updateFiles
    ]
})

await agent.invoke({
    messages: [
        {
            role: "user",
            content: "update the theme of the project to light mode. hit api to list files, read files, and update files as necessary to accomplish this task. you can also create new files if necessary."
        }
    ]
})