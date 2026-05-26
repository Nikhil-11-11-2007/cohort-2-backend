const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    }
},
    { timestamps: true }
)

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel