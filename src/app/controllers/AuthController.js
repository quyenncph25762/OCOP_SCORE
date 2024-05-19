const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class AuthController {
    loginPage = (req, res) => {
        res.render("auth/login")
    }
    login = (req, res) => {
        console.log(req.body)
        const FullName = req.body.FullName
        const Email = req.body.Email
        const Password = req.body.Password
        const Address = req.body.Address
        AccountModel.loginAccount(FullName, Email, Password, Address, (err, data) => {
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
    getOneUser = (req, res) => {
        const id = req.params.id
        AccountModel.fetchOneUser(id, (err, User) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
        })
    }
}

module.exports = new AuthController