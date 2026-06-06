import "dotenv/config"
import app from "./app.ts";

const port = process.env.PORT

// console.log("hi")

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})