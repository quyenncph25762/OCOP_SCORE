const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class SiteController {
    // [GET] /
    home(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                if (User?.[0].role_title.toLowerCase() !== "admin") {

                    res.redirect("/client/welcome")
                } else {
                    console.log(User[0])
                    res.render('home', { User: User[0] });
                }
            })
        } else {
            res.redirect("/auth/loginPage")
        }
    }

    // [GET] /search
    // search(req, res) {
    //     res.render('search');
    // }
}

module.exports = new SiteController();
