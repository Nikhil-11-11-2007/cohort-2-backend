const { registerService, loginService, getAccessTokenService } = require("../services/auth.service")

const registerController = async (req, res) => {


    const { accessToken, refreshToken, newUser } = await registerService(req.body)

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

    const { accessToken, refreshToken, isExisted } = await loginService(req.body)

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

    return res.status(200).json({
        message: "User loggedIn",
        user: {
            id: isExisted._id,
            name: isExisted.name,
            email: isExisted.email,
            createdAt: isExisted.createdAt,
            updatedAt: isExisted.updatedAt,
            __v: isExisted.__v,
            refreshToken: isExisted.refreshToken
        }
    })

}

const getAccessTokenController = async (req,res) => {

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) {
        return res.status(401).json({
            message: "Unauthorized request"
        })
    }

    const accessToken = await getAccessTokenService(refreshToken)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 20 * 60 * 1000
    })

    return res.status(200).json({
        message: "AccessToken generated"
    })

}

module.exports = { registerController, loginController, getAccessTokenController }