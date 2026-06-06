import dns from "node:dns"

dns.setServers(["1.1.1.1","8.8.8.8"])
import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("mongoDB connected")
    } catch (error) {
        console.log("error in connnect db", error)
    }
}