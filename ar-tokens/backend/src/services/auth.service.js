const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens")

const registerService = async (data) => {
    try {

        const { name, email, password } = data

        if (!email || !password) {
            throw new Error("all fields are required")
        }

        const isExisted = await UserModel.findOne({ email })

        if (isExisted) throw new Error("User already exists with this email");

        const hashPass = bcrypt.hashSync(password, 10)

        const newUser = await UserModel.create({
            name, email, password: hashPass
        })

        const accessToken = generateAccessToken(newUser._id)
        const refreshToken = generateRefreshToken(newUser._id)

        newUser.refreshToken = refreshToken
        await newUser.save()

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
            throw new Error("All fields are required");
        }

        const isExisted = await UserModel.findOne({ email }).select("+password")

        if (!isExisted) {
            throw new Error("User not found");
        }

        const hashPass = await bcrypt.compare(password, isExisted.password)

        if (!hashPass) {
            throw new Error("Invalid credentials");
        }

        const accessToken = generateAccessToken(isExisted._id)
        const refreshToken = generateRefreshToken(isExisted._id)

        isExisted.refreshToken = refreshToken
        await isExisted.save()

        return {
            accessToken,
            refreshToken,
            isExisted
        }

    } catch (error) {
        throw new Error(error)
    }
}

const getAccessTokenService = async (refreshToken) => {

    try {

        let decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        if (!decode) throw new Error("unauthorized");

        const user = await UserModel.findById(decode.id)

        if (!user) throw new Error("User not foun")

        if (refreshToken !== user.refreshToken) {
            throw new Error("unauthorized");
        }

        const accessToken = generateAccessToken(user._id)

        return accessToken

    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
}

module.exports = { registerService, loginService, getAccessTokenService }