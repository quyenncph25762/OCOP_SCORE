const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class AuthController {
    // trang dang nhap
    loginPage = (req, res) => {
        res.render("auth/login")
    }
    // dang nhap
    login = (req, res) => {
        const UserName = req.body.UserName
        const Password = req.body.Password
        AccountModel.loginAccount(UserName, Password, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            if (data.length === 0) {
                return res.status(400).json({
                    message: "Tài khoản mật khẩu không chính xác"
                })
            }
            const account = data[0]
            const token = jwt.sign({ _id: account._id }, SECRET_CODE, { expiresIn: "1d" })
            return res.json({
                message: "Đăng nhập hành công",
                token: token,
                User: account
            })
        })
    }
    // dang ki
    register = (req, res) => {
        WorkPositionModel.fetchAllWorkPosition((err, WorkPosition) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            res.render("auth/register", { WorkPosition: WorkPosition })
        })
    }

    resetPassword = (req, res) => {
        res.render("auth/resetPassword")
    }
    // lay 1 tai khoan
    getOneUser = (req, res) => {
        const id = req.params.id
        AccountModel.fetchOneUser(id, (err, User) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(User[0])
        })
    }
    // tim 1 tai khoan
    findUser(req, res) {
        const id = req.params.id
        const { Password } = req.body
        AccountModel.findUserById(id, Password, (err, User) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(User)
        })
    }
    // changePassowrd
    changePassword(req, res) {
        const id = req.params.id
        const { Password } = req.body
        console.log(Password)
        AccountModel.changePasswordByUserId(id, Password, (err, User) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json({
                message: "Đổi mật khẩu thành công"
            })
        })
    }
}

module.exports = new AuthController