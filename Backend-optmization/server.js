import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Redis from "ioredis";
import dns from "node:dns/promises"
import userModel from "./models/user.model.js";

dns.setServers(["1.1.1.1", "8.8.8.8"])

const connectToDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDB")

    } catch (error) {
        console.log("Error connecting mongoDB: ", error)
    }

}

connectToDB()

const redis = new Redis(process.env.REDIS_URI);

redis.once("ready", () => {
    console.log("Connected to redis")
})

const app = express()
app.use(morgan("dev"))
app.use(express.json())

app.get("/api/user/:id", async (req, res) => {
    try {

        const user = await userModel.findOne({ _id: req.params.id })
        res.status(200).json({
            message: "User fetched Successfully",
            data: user
        })

    } catch (error) {
        res.status(500).json({
            error: "Error fetching user."
        })

    }
})

app.post("/api/user", async (req, res) => {
    try {
        const { name, email } = req.body
        const newUser = await userModel.create({name, email})
        res.status(201).json({
            message: "User created successfully",
            newUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating user"
        })
    }
})

const Port = process.env.PORT || 5000

app.listen(Port, () => {
    console.log(`Server is running on Port: ${Port}`)
})