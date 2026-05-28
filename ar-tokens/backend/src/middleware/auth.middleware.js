const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {

    try {

        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized request"
            });
        }

        const decode = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET
        );

        const user = await UserModel.findById(decode.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired access token"
        });
    }
};

module.exports = authMiddleware;