const ScoreFileModel = require("../../models/scorefile/ScoreFileModel")
const ScoreFileDetailModel = require("../../models/scorefile/ScoreFileDetailModel")
const AccountModel = require("../../models/Account")
const ProductModel = require("../../models/product/ProductmanageModel")
const EmployeeModel = require("../../models/employee/EmployeeModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const ScoreCommitteeDetailModel = require("../../models/scoreCommittee/ScoreCommitteeDetailModel")
dotenv.config();
const { SECRET_CODE } = process.env

class ScoreFileController {
    index(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                ScoreFileModel.getScoreFileByEmployee(UserDataCookie?._id, (err, ScoreFile) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    res.render("scoreFile/scoreFile", { User: User[0], ScoreFile: ScoreFile })
                })
            })
        }

    }
    // getOne
    getOneController = async (req, res) => {
        try {
            const id = req.params.id
            const data = await ScoreFileModel.getOne(id)
            if (data) {
                return res.status(200).json(data[0])
            } else {
                return res.status(400).json({
                    message: "Khong co scorefile nao"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // getAllFromTrash
    getAllFromTrash(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ScoreFileModel.getAllFromTrash((err, ScoreFile) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    res.render("scoreFile/trash", { User: User[0], ScoreFile: ScoreFile })
                })
            })
        }

    }
    // get ScoreFile by scoreCommittee
    getScoreFileByScoreCommittee(req, res) {
        const idScoreCommitee = req.params.id

        ScoreFileModel.getScoreFileByScoreCommittee(idScoreCommitee, (err, scorefiles) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(scorefiles)
        })
    }
    // get ScoreFile by scoreCommitteeAll
    getScoreFileByScoreCommitteeAll(req, res) {
        const idScoreCommitee = req.params.id

        ScoreFileModel.getScoreFileByScoreCommitteeAll(idScoreCommitee, (err, scorefiles) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(scorefiles)
        })
    }
    // tim scoreFile theo status = 0
    getScoreByStatus(req, res) {
        ScoreFileModel.getScoreFileByStatus((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(data)
        })
    }
    // tao scoreFile
    createScoreFile(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                EmployeeModel.fetchAllEmployeeByDistrict(User[0]?.DistrictId, async (err, employees) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    // loc ra nhung employee khong bi khoa
                    const employeeFilter = employees.filter((employee) => employee.isLock === 0)
                    await employeeFilter.forEach(async (employee) => {
                        ScoreFileModel.create({
                            forEmployeeId: employee._id,
                            IsActive: 0,
                            Status: 0,
                            DistrictId: User[0]?.DistrictId,
                            ...req.body
                        }, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Lỗi truy vấn"
                                })
                            }
                        })
                    });
                    return res.status(200).json({
                        message: "Them thanh cong"
                    })
                })
            })
        }


    }
    // page tao moi
    createPage(req, res) {
        const cookie = req.cookies
        const idScoreCommitee = req.query.scoreCommitteeId
        const productId = req.query.productId
        const scorefileId = req.query._id
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                // lay id hoi dong

                if (idScoreCommitee) {
                    // lay danh sach hoi dong chi tiet
                    ScoreCommitteeDetailModel.getByScoreCommittee(idScoreCommitee, async (err, listScoreCommitteeDetail) => {
                        if (err) {
                            return res.status(500).json({
                                message: err
                            })
                        }
                        // thuc hien tim ra id hoi dong chi tiet bang cach loc xem co userid nao === voi user.id dang dang nhap khong
                        const scoreCommitteeDetailFilter = listScoreCommitteeDetail?.filter((item) => item.UserId === User[0]._id)

                        // lay danh sach scorefile theo hoi dong
                        ScoreFileModel.getScoreFileByScoreCommittee(idScoreCommitee, (err, listScoreFile) => {
                            if (err) {
                                return res.status(500).json({
                                    message: err
                                })
                            }
                            // tim ra scorefile cua secUserId
                            const scoreFileSecUserId = listScoreFile?.filter((employee) => employee.Employee_id === scoreCommitteeDetailFilter[0]?.SecUserId)
                            // sau khi tim dc thi thuc hien truyen vao handlebars
                            res.render("scoreFile/createScoreFile", { User: User[0], scoreCommitteeDetail: scoreCommitteeDetailFilter ? scoreCommitteeDetailFilter[0] : [], productId: productId, scorefileId: scoreFileSecUserId ? scoreFileSecUserId[0] : [] })
                        })


                    })
                }
            })
        }

    }
    // updatePage
    updatePage(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                const idScoreFile = Number(req.query.ScoreFile_id)

                const ScoreFile = await ScoreFileModel.getOne(idScoreFile)
                if (!ScoreFile) {
                    return res.status(400).json({
                        message: "Khong co scorefile nao"
                    })
                }
                res.render("scoreFile/scoreFileUpdate", { User: User[0], ScoreFile: ScoreFile[0] })
            })
        }

    }
    // reviewPage
    reviewPage(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                const idScoreFile = Number(req.query.ScoreFile_id)
                const ScoreFile = await ScoreFileModel.getOne(idScoreFile)
                if (!ScoreFile) {
                    return res.status(400).json("Khong co scorefile nao")
                }
                res.render("scoreFile/review", { User: User[0], ScoreFile: ScoreFile[0] })
            })
        }

    }
    // action cap nhat
    update(req, res) {
        const id = req.params.id
        ScoreFileModel.update(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công"
            })
        })
    }
    // action cap nhat ScoreCommittee
    updateScoreCommittee(req, res) {
        const id = req.params.id
        ScoreFileModel.updateScoreCommitteOnScoreFile(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công!"
            })
        })
    }
    // action cap nhat ScoreTotal
    updateScoreTotal(req, res) {
        const id = req.params.id
        ScoreFileModel.updateScoreTotal(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công!"
            })
        })
    }
    // action cap nhat ScoreTotal
    updateStatusScoreFile(req, res) {
        const id = req.params.id
        ScoreFileModel.updateStatus(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công!"
            })
        })
    }
    // removeToTrash
    revert(req, res) {
        const id = req.params.id
        ScoreFileModel.revert(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(204).json({
                message: "Khôi phục thành công"
            })
        })
    }
    // remove
    removeScoreFile = async (req, res) => {
        try {
            const id = req.params.id
            if (id) {
                await ScoreFileModel.remove(id)
                await ScoreFileDetailModel.removeAll(id)
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = new ScoreFileController