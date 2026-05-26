const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
    try {

        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }

        let decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const user = await UserModel.findById(decode.id)

        req.user = user;
        next()

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = authMiddleware