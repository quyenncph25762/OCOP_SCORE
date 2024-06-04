const ScoreFileModel = require("../../models/scorefile/ScoreFileModel")
const AccountModel = require("../../models/Account")
const ProductModel = require("../../models/product/ProductmanageModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env

class ScoreFileController {
    index(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ScoreFileModel.getAll((err, ScoreFile) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    res.render("scoreFile/scoreFile", { User: User[0], ScoreFile: ScoreFile })
                })
            })
        }

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
        ScoreFileModel.create(req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json({
                message: "Them thanh cong"
            })

        })
    }
    // page cap nhat
    createPage(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                res.render("scoreFile/createScoreFile", { User: User[0] })
            })
        }

    }
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
                    res.render("scoreFile/scoreFileUpdate", { User: User[0], ScoreFile: ScoreFile[0] })
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
        console.log(req.body)
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
}

module.exports = new ScoreFileController