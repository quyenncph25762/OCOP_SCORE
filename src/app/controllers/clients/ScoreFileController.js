const ScoreFileModel = require("../../models/scorefile/ScoreFileModel")
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
                    console.log(ScoreFile)
                    res.render("scoreFile/scoreFile", { User: User[0], ScoreFile: ScoreFile })
                })
            })
        }

    }
    // getOne
    getOneController(req, res) {
        const id = req.params.id
        ScoreFileModel.getOne(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(data[0])
        })
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
        EmployeeModel.fetchAllEmployee(async (err, employees) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            await employees.forEach(async (employee) => {
                ScoreFileModel.create({
                    forEmployeeId: employee._id,
                    IsActive: 0,
                    Status: 0,
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
                            const scoreFileSecUserId = listScoreFile?.filter((employee) => employee.Employee_id === scoreCommitteeDetailFilter[0].SecUserId)
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
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                const idScoreFile = Number(req.query.ScoreFile_id)

                ScoreFileModel.getOne(idScoreFile, (err, ScoreFile) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    console.log(ScoreFile[0])
                    res.render("scoreFile/scoreFileUpdate", { User: User[0], ScoreFile: ScoreFile[0] })
                })
            })
        }

    }
    // reviewPage
    reviewPage(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                const idScoreFile = Number(req.query.ScoreFile_id)
                ScoreFileModel.getOne(idScoreFile, (err, ScoreFile) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    console.log(ScoreFile[0])
                    res.render("scoreFile/review", { User: User[0], ScoreFile: ScoreFile[0] })
                })
            })
        }

    }
    // action cap nhat
    update(req, res) {
        const id = req.params.id
        const { RankOcop, ScoreTotal, Product_id } = req.body
        const product = { RankOcop, ScoreTotal, Product_id }
        // update RankOcop Product
        ProductModel.updateRankOcopProduct(product.Product_id, product, (err, result) => {
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
    removeToTrash(req, res) {
        const id = req.params.id
        ScoreFileModel.removeToTrash(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(204).json({
                message: "Xóa thành công"
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
    // removeForever
    removeForever(req, res) {
        const id = req.params.id
        ScoreFileModel.remove(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(204).json({
                message: "Xóa thành công"
            })
        })
    }

}

module.exports = new ScoreFileController