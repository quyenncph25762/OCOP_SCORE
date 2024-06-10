const AccountModel = require("../models/Account")
const EmployeeModal = require("../models/employee/EmployeeModel")
const RoleModal = require("../models/role/RoleModel")
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
                if (User[0].DistrictId) {
                    EmployeeModal.fetchAllEmployeeByDistrict(User[0].DistrictId, (err, Employee) => {
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
                            res.render("userPage/userPage", { User: User[0], Employee: Employee, Role: Role })
                        })
                    })
                } else {
                    EmployeeModal.getAllAdmin((err, Employee) => {
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
                            res.render("userPage/userPage", { User: User[0], Employee: Employee, Role: Role })
                        })
                    })
                }
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
    create(req, res) {
        AccountModel.findUserAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                if (data.length === 0) {
                    AccountModel.AddUser({
                        Code: req.body.Code,
                        Password: req.body.Password,
                        FullName: req.body.FullName,
                        UserName: req.body.UserName,
                        Email: req.body.Email,
                        Avatar: req.file ? req.file.path : 'Uploads/user.png',
                        Phone: req.body.Phone,
                        roleId: req.body.roleId,
                        CreatorUser_id: req.body.CreatorUser_id,
                    }, (err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                message: err
                            });
                        } else {
                            return res.status(201).json({
                                message: 'Thêm mới thành công'
                            });
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: "Tên đã tồn tại"
                    })
                }
            }
        })
    }
    update(req, res) {
        const id = req.params.id
        AccountModel.findUserUpdate(id, req.body, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                if (data.length === 0) {
                    AccountModel.updateUser(id, req.body, (err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                message: err
                            });
                        }
                        return res.status(201).json({
                            message: 'Cập nhật thành công'
                        });
                    })
                } else {
                    return res.status(400).json({
                        message: "Tên đã tồn tại"
                    })
                }
            }
        })
    }
    // Khoa tai khoan
    lock(req, res) {
        const id = req.params.id
        console.log(req.body)
        AccountModel.lockUser(id, req.body, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Loi truy van"
                })
            }
            return res.status(203).json({
                message: "Đã khóa tài khoản người dùng"
            })
        })
    }
}

module.exports = new UserPageController