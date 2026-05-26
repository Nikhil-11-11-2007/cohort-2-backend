const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens")

const registerService = async (data) => {
    try {

        const { name, email, password } = data

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

        return {
            accessToken,
            refreshToken,
            newUser
        }

    } catch (error) {
        throw new Error(error)
    }
}

const loginService = async (data) => {
    try {

        const { email, password } = data

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const isExisted = await UserModel.findOne({ email }).select("+password")

        if (!isExisted) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const hashPass = await bcrypt.compare(password, isExisted.password)

        if(!hashPass) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const accessToken = generateAccessToken(isExisted._id)
        const refreshToken = generateRefreshToken(isExisted._id)

        return {
            accessToken,
            refreshToken,
            isExisted
        }

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { registerService, loginService }