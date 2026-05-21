import httpServer from "./src/app.js";



httpServer.listen(3000, "0.0.0.0", () => {
    console.log("Agent server is running on port 3000");
})