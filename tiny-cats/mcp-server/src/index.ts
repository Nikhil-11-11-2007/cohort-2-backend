import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCatsTool, recommendCatsTool } from "./tools/recommendCats.tool.ts";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

// Create server instance
const server = new McpServer({
  name: "tiny-cats",
  version: "1.0.0",
});

server.registerTool("recommend_cats",
  {
    title: "recommend_cats",
    description: "Recommend a best Cat breed according to inputs",
    inputSchema: {
      kidsFriendly: z.boolean(),
      apartmentFriendly: z.boolean(),
    },
  },
  async ({ kidsFriendly, apartmentFriendly }) => {
    const result = await recommendCatsTool(kidsFriendly, apartmentFriendly)

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ]
    }
  }
);

server.registerTool("get_all_cats",
  {
    title: "all_cats",
    description: "cats data",
  },
  async () => {
    const result = await getAllCatsTool()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ]
    }
  }
);


const transporter = new StdioServerTransport();

await server.connect(transporter)

console.error("tiny cats mcp running..");
