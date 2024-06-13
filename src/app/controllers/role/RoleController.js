const RoleModel = require("../../models/role/RoleModel")
const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class ProductGroupControllers {
    // fetchAll
    index(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                RoleModel.fetchAllRole((err, Role) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!Role) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }
                    if (User?.[0].role_title.toLowerCase() !== "admin") {
                        res.redirect("/client")
                    } else {
                        res.render("role/role", { Role: Role, User: User[0] })
                    }
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    // hien thi trong thung rac
    getAllRoleFromTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                RoleModel.fetchAllRoleFromTrash((err, Role) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!Role) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }
                    if (User?.[0].role_title.toLowerCase() !== "admin") {
                        res.redirect("/client")
                    } else {
                        res.render("role/trash", { Role: Role, User: User[0] })
                    }
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    // them
    create(req, res, next) {
        RoleModel.findRoleAdd(req.body.title, (err, data) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
                return res.status(400).json({ success: false, message: 'Tên đã tồn tại' });
            } else {
                if (data.length === 0) {
                    RoleModel.AddRole({
                        title: req.body.title,
                        status: req.body.status === "true" ? 1 : 0,
                        note: req.body.note,
                        creatorUser_id: req.body.creatorUser_id
                    }, (err, data) => {
                        if (err) {
                            console.error('Lỗi thêm sản phẩm:', err);
                            return res.status(500).json({
                                message: "Internal Server Error"
                            });
                        } else {
                            return res.status(201).json({
                                message: "Theem thanh cong"
                            });
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: "Thêm thất bại , giá trị đã tồn tại"
                    })
                }
            }
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            const id = req.params.id
            RoleModel.deleteRoleToTrash(id, UserDataCookie?._id, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                } else {
                    return res.status(203).json({
                        message: "Xoa thanh cong"
                    })
                }
            })
        }

    }
    // xoa
    remove(req, res, next) {
        const id = req.params.id
        RoleModel.deleteRole(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(203).json({
                    message: "Xóa thành công"
                })
            }
        })
    }
    // khoi phuc
    revert(req, res, next) {
        const id = req.params.id
        RoleModel.revertRole(id, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            } else {
                return res.status(200).json({
                    message: "Khôi phục thành công"
                })
            }
        })
    }
    // update
    update(req, res, next) {
        const id = req.params.id
        RoleModel.findRoleUpdate(id, req.body.title, (err, data) => {
            if (err) {
                return res.json({ success: false, message: 'loi truy xuat' })
            } else {
                if (data.length === 0) {
                    RoleModel.updateRole(id, ({
                        title: req.body.title,
                        note: req.body.note,
                        status: req.body.status === 'true' ? 1 : 0
                    }), (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                message: `${err}: Loi updateRole`
                            })
                        }
                        return res.status(202).json({
                            message: "Sửa thành công"
                        })
                    })
                } else {
                    return res.status(400).json({ success: false, message: 'Ten da ton tai' })
                }
            }
        })


    }
}

module.exports = new ProductGroupControllers