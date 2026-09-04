import mongoose from "mongoose";

const userSchem = new mongoose.Schema({
    name: String,
    email: String,
})

const userModel = mongoose.model("User", userSchem);
export default userModel