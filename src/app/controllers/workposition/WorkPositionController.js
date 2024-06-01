const WorkPositionModel = require("../../models/workposition/WorkPositionModel")
const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class WorkPositionControllers {
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
                WorkPositionModel.fetchAllWorkPosition((err, workPosition) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!workPosition) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }
                    if (User?.[0].role_title.toLowerCase() !== "admin") {

                        res.redirect("/client/welcome")
                    } else {
                        res.render("workPosition/workPosition", { workPosition: workPosition, User: User[0] })
                    }
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }
    }
    // hien thi trong thung rac
    getAllWorkPositionModelFromTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                WorkPositionModel.fetchAllWorkPositionFromTrash((err, workPosition) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!workPosition) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }
                    if (User?.[0].role_title.toLowerCase() !== "admin") {

                        res.redirect("/client/welcome")
                    } else {
                        res.render("workPosition/trash", { workPosition: workPosition, User: User[0] })
                    }
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    // them
    create(req, res, next) {
        const dateTime = new Date()
        WorkPositionModel.findWorkPositionAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy xuat"
                })
            } else {
                if (data.length === 0) {
                    WorkPositionModel.AddWorkPosition({
                        Name: req.body.Name,
                        Code: req.body.Code,
                        IsManager: req.body.IsManager === "true" ? 1 : 0,
                        IsActive: req.body.IsActive === "true" ? 1 : 0,
                        Note: req.body.note,
                        CreatorUser_id: req.body.CreatorUser_id,
                        CreationTime: dateTime
                    }, (err, data) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Internal Server Error'
                            })
                        } else {
                            return res.status(201).json({
                                message: 'Thêm thành công'
                            })
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: "Ten da ton tai"
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
            WorkPositionModel.deleteWorkPositionToTrash(id, UserDataCookie?._id, (err, result) => {
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
        WorkPositionModel.deleteWorkPosition(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })
            }
        })
    }
    // khoi phuc
    revert(req, res, next) {
        const id = req.params.id
        WorkPositionModel.revertWorkPosition(id, (err, data) => {
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
        console.log(req.body)
        const dateTime = new Date()
        const id = req.params.id
        WorkPositionModel.findWorkPositionUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy xuat"
                })
            } else {
                if (data?.length === 0) {
                    WorkPositionModel.updateProductGroup(id, ({
                        Name: req.body.Name,
                        Code: req.body.Code,
                        IsManager: req.body.IsManager === 'true' ? 1 : 0,
                        IsActive: req.body.IsActive === 'true' ? 1 : 0,
                        Note: req.body.Note,
                        CreationTime: dateTime
                    }), (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                message: `${err}: Loi updateProductGroup`
                            })
                        }
                        return res.status(202).json({
                            message: `Cập nhật thành công`
                        })
                    })
                } else {
                    return res.status(400).json({
                        message: "Ten da ton tai"
                    })
                }
            }
        })
    }
}

module.exports = new WorkPositionControllers