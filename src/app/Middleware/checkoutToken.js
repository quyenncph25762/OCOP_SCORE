const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { fetchOneUser } = require("../models/Account");
dotenv.config();
const { SECRET_CODE } = process.env
class CheckController {
    checkout(req, res, next) {
        const authorization = req?.headers?.cookie
        if (!authorization) {
            res.redirect("/auth/loginPage")
            return res.status(400).json({
                message: "Bạn chưa đăng nhập!"
            })
        }
        const token = req.headers.cookie.split("=")[1]
        jwt.verify(token, SECRET_CODE, async (err, payload) => {
            if (err) {
                if (err.name === "JsonTokenWebError") {
                    return res.status(400).json({
                        message: "Token loi",
                    });
                }
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token het han",
                    });
                }
            }
            const user = await fetch(`http://localhost:3000/auth/get/${payload?._id}`, {
                method: "GET"
            })
            const data = await user?.json()
            const UserRoleTitle = data?.role_title?.toLowerCase()
            if (!user) {
                return res.status(400).json({
                    message: "USER KHONG TON TAI TRONG HE THONG"
                })
            }
            if (UserRoleTitle !== "admin") {
                return res.status(400).json({
                    message: "Bạn không có quyền để thực hiện hành động này",
                });
            }
        })
        next()
    }
}

module.exports = new CheckController()