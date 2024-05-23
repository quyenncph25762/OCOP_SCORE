const AccountModel = require("../models/Account")
const EmployeeModal = require("../models/EmployeeModel")
const RoleModal = require("../models/RoleModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env


class UserPageController {
    index(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: `Looi truy xuat ${err}`
                    })
                }
                EmployeeModal.fetchAllUser((err, Employee) => {
                    if (err) {
                        return res.status(500).json({
                            message: `Loi truy xuat ${err}`
                        })
                    }
                    RoleModal.fetchAllRole((err, Role) => {
                        if (err) {
                            return res.status(500).json({
                                message: `Looi truy xuat ${err}`
                            })
                        }
                        console.log(Employee)
                        res.render("userPage/userPage", { User: User[0], Employee: Employee, Role: Role })
                    })
                })
            })
        }

    }
    trash(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: `Looi truy xuat ${err}`
                    })
                }
                EmployeeModal.fetchAllEmployeeFromTrash((err, Employee) => {
                    if (err) {
                        return res.status(500).json({
                            message: `Looi truy xuat ${err}`
                        })
                    }
                    res.render("userPage/trash", { User: User[0], Employee: Employee })
                })
            })
        }

    }
}

module.exports = new UserPageController