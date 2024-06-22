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
                WorkPositionModel.fetchAllWorkPosition(User[0]?.DistrictId, (err, workPosition) => {
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
                    res.render("workPosition/workPosition", { workPosition: workPosition, User: User[0] })
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
                WorkPositionModel.fetchAllWorkPositionFromTrash(User[0]?.DistrictId, (err, workPosition) => {
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
                    res.render("workPosition/trash", { workPosition: workPosition, User: User[0] })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    // them
    create(req, res, next) {
        console.log(req.body)
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                WorkPositionModel.findWorkPositionAdd(User[0].DistrictId, req.body, (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Loi truy xuat"
                        })
                    }
                    if (data.length === 0) {
                        WorkPositionModel.AddWorkPosition({
                            DistrictId: User?.[0].DistrictId ? User?.[0].DistrictId : null,
                            ...req.body
                        }, (err, data) => {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Internal Server Error'
                                })
                            }
                            return res.status(201).json({
                                message: 'Thêm thành công'
                            })
                        })
                    } else {
                        return res.status(400).json({
                            message: "Ten da ton tai"
                        })
                    }
                })
            })
        }


    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            const id = req.params.id
            WorkPositionModel.deleteWorkPositionToTrash(id, UserDataCookie?._id, (err, result) => {
                if (err) {
                    return res.status(500).json({
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
    // xoa vao thung rac nhieu
    removeToTrashAll = async (req, res) => {
        try {
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    for (const id of req.body) {
                        await WorkPositionModel.deleteWorkPositionToTrashAll(id, User[0]?._id)
                    }
                    return res.status(203).json({
                        message: "Xoa thanh cong"
                    })
                })
            }
        } catch (error) {
            console.log(error)
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
    removeAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await WorkPositionModel.deleteWorkPositionAll(id)
            }
            return res.status(203).json({
                message: "Xoa thanh cong"
            })
        } catch (error) {
            console.log(error)
        }
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
    revertAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await WorkPositionModel.revertWorkPositionAll(id)
            }
            return res.status(203).json({
                message: "Xoa thanh cong"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // update
    update(req, res, next) {
        // console.log(req.body)
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                const id = req.params.id
                WorkPositionModel.findWorkPositionUpdate(id, User[0].DistrictId, req.body, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Loi truy xuat"
                        })
                    } else {
                        if (data?.length === 0) {
                            WorkPositionModel.updateWorkPosition(id, req.body, (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: `${err}: Loi updateWorkPosition`
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
            })
        }
    }
}

module.exports = new WorkPositionControllers