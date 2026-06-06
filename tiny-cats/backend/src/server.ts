import "dotenv/config"
import app from "./app.ts";
import { connectDB } from "./config/db.ts";

const port = process.env.PORT

connectDB()

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})