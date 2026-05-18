import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";

import { listFiles, readFiles, updateFiles } from "./tools.js";

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  apiKey: process.env.MISTRALAI_API_KEY,
  temperature: 0,
});

const agent = createAgent({
  model,

  tools: [
    listFiles,
    readFiles,
    updateFiles,
  ],

});


export default agent;
