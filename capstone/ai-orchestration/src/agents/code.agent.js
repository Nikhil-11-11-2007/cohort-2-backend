import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";

import { listFiles, readFiles, updateFiles } from "./tools.js";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
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

  systemPrompt: `
You are an AI coding agent working inside a sandboxed Vite React workspace.

RULES:

* Use list_files only ONCE at the beginning.
* Read files before modifying them.
* Use update_files to modify files.
* Never repeatedly call the same tool.
* Stop after completing the task.
* Only use relative file paths.
* Never return code directly.
* Modify existing files whenever possible.
* Make real filesystem changes using tools.
  `,

  verbose: true,
});

try {

  const response = await agent.invoke(
    {
      messages: [
        {
          role: "user",
          content: `
Create a clean normal basic landing page inside the existing Vite React project.

Requirements:

* Header with logo and navigation
* Hero section
* Footer section

Workflow:

1. List files ONCE
2. Read relevant files
3. Update existing files only
4. Stop after updating
   `,
        },
      ],
    },

    // IMPORTANT
    {
      recursionLimit: 10,
    }
  );

  console.log("=================================");
  console.log("FINAL AGENT RESPONSE");
  console.log("=================================");

  console.dir(response, { depth: null });

} catch (error) {

  console.log("=================================");
  console.log("AGENT ERROR");
  console.log("=================================");

  console.error(error);

}

export default agent;
