const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class WelcomeController {
    index(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }

                res.render("client/clientPage", { User: User[0] })
            })
        }
    }
}

module.exports = new WelcomeController