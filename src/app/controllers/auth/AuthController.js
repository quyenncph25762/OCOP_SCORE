const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const EmployeeModel = require("../../models/employee/EmployeeModel");
const bcrypt = require("bcrypt")
const mailer = require("../../../utils/mailer");
const { token } = require("morgan");
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
    // forgotPassword
    resetPassword = (req, res) => {
        res.render("auth/resetPassword")
    }
    sendResetLinkEmail = (req, res) => {
        console.log(req.body);
        EmployeeModel.findEmployeeByEmail(req.body, (err, employee) => {
            if (err) {
                return res.status(500).json({
                    message: err
                });
            }
            if (!employee) {
                res.redirect("/auth/password/reset");
            } else {
                bcrypt.hash(employee[0].Email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    const resetLink = `${process.env.APP_URL}/auth/password/reset/${employee[0].Email}?token=${hashedEmail}`;
                    console.log(resetLink)
                    mailer.sendMail(employee[0].Email, "RESET PASSWORD", `<a href="${resetLink}">RESET PASSWORD</a>`);
                    return res.status(204).json({
                        message: "Đã gửi tới email",
                        resetLink: resetLink
                    });
                });
            }
        });
    };

    showResetForm = (req, res) => {
        console.log(req.params.email)
        if (!req.params.email || !req.query.token) {
            res.redirect('/auth/password/reset')
        } else {
            res.render("auth/newPassword", { Email: req.params.email, token: req.query.token })
        }
    }
    reset = (req, res) => {
        const { Email, token, Password } = req.body;
        if (!Email || !token || !Password) {
            return res.status(400).json({
                message: "Có lỗi xảy ra"
            })
        } else {
            bcrypt.compare(Email, token, (err, result) => {
                console.log('compare', result);
                if (result == true) {
                    AccountModel.changePasswordByEmail(Email, Password, (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }
                        return res.status(203).json({
                            message: "Cập nhật mật khẩu thành công!"
                        })
                    })
                } else {
                    return res.status(401).json({
                        message: "Email không chính xác"
                    })
                }
            })
        }
    }
}

module.exports = new AuthController