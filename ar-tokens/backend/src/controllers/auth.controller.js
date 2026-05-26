const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens")

const registerController = async (req, res) => {

    const { name, email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isExisted = await UserModel.findOne({ email })

    if (isExisted) {
        return res.status(409).json({
            message: "User already exists with this email"
        })
    }

    const hashPass = bcrypt.hashSync(password, 10)

    const newUser = await UserModel.create({
        name, email, password: hashPass
    })

    const accessToken = generateAccessToken(newUser._id)
    const refreshToken = generateRefreshToken(newUser._id)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 20 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
        message: "User registered successfully",
        user: newUser
    })

}

const loginController = async (req, res) => {

}

module.exports = { registerController, loginController }