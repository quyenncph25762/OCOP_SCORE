const dotenv = require("dotenv")
dotenv.config();
const jwt = require("jsonwebtoken")
const AccountModel = require("../../models/Account")
const { SECRET_CODE } = process.env
const WorkDepartmentModel = require("../../models/workdepartment/WorkDepartmentModel")
class WorkDepartmentController {
    // fetchAll
    index(req, res, next) {
        const cookie = req?.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                WorkDepartmentModel.fetchAllWorkDepartment(User[0]?.DistrictId, (err, workDepartment) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    if (!workDepartment) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }

                    res.render("workDepartment/workDepartment", { workDepartment: workDepartment, User: User[0] })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }
    }
    // hien thi trong thung rac
    getAllWorkDepartmentFromTrash(req, res, next) {
        const cookie = req?.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                WorkDepartmentModel.fetchAllWorkDepartmentFromTrash(User[0]?.DistrictId, (err, workDepartment) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    if (!workDepartment) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }

                    res.render("workDepartment/trash", { workDepartment: workDepartment, User: User[0] })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    // them
    create(req, res, next) {
        const cookie = req?.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                WorkDepartmentModel.findWorkDepartmentAdd(User[0]?.DistrictId, req.body, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy xuất"
                        })
                    } else {
                        if (data.length === 0) {
                            WorkDepartmentModel.AddWorkDepartment({
                                DistrictId: User[0]?.DistrictId ? User[0]?.DistrictId : null,
                                ...req.body
                            }, (err, data) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: 'Internal Server Error'
                                    });
                                } else {
                                    return res.status(201).json({
                                        message: 'Thêm thành công'
                                    });
                                }
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
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            const id = req.params.id
            WorkDepartmentModel.deleteWorkDepartmentToTrash(id, UserDataCookie?._id, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })

            })
        }
    }
    // Xoa vao thung rac nhieu
    removeToTrashAll = async (req, res) => {
        try {
            const cookie = req?.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    for (const id of req.body) {
                        await WorkDepartmentModel.deleteWorkDepartmentToTrashAll(id, User[0]._id)
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
        WorkDepartmentModel.deleteWorkDepartment(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })
            }
        })
    }
    // Xoa nhieu
    removeAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await WorkDepartmentModel.deleteWorkDepartmentAll(id)
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
        WorkDepartmentModel.revertWorkDepartment(id, (err, data) => {
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
    // khoi phuc nhieu
    revertAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await WorkDepartmentModel.revertWorkDepartmentAll(id)
            }
            return res.status(203).json({
                message: "khoi phuc thanh cong"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // update
    update(req, res, next) {
        const cookie = req?.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                const id = req.params.id
                WorkDepartmentModel.findWorkDepartmentUpdate(id, User[0]?.DistrictId, req.body, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy xuất"
                        })
                    } else {
                        if (data?.length === 0) {
                            WorkDepartmentModel.updateWorkDepartment(id, ({
                                title: req.body.title,
                                code: req.body.code,
                                description: req.body.description,
                            }), (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: `${err}: Loi updateWorkDepartment`
                                    })
                                }
                                return res.status(200).json({
                                    message: "Cập nhật thành công"
                                })
                            })
                        } else {
                            return res.status(400).json({
                                message: "Name đã tồn tại"
                            })
                        }
                    }
                })
            })
        }
    }
}

module.exports = new WorkDepartmentController