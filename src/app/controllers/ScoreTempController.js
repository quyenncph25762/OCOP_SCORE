const AccountModel = require("../models/Account")
const ProductDetailModel = require("../models/ProductDetailModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
const ProductGroupModel = require("../models/ProductGroupModel")
const ScoreTempModel = require("../models/ScoreTempModel")
const ScoreTempDetailModel = require("../models/ScoreDetailModel")
class ScoreTempController {
    index(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
                if (User?.[0].role_title.toLowerCase() !== "admin") {
                    res.redirect("/client")
                } else {
                    ScoreTempModel.getAllScoreTemp((err, ScoreTemp) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }
                        res.render("scoreTemp/scoreTemp", { User: User[0], ScoreTemp: ScoreTemp })
                    })
                }
            })
        }

    }
    addPage(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                if (User?.[0].role_title.toLowerCase() !== "admin") {

                    res.redirect("/client")
                } else {
                    ProductGroupModel.fetchAllProductGroup((err, productGroup) => {
                        if (err) {
                            return res.status(400).json({
                                message: err
                            })
                        }
                        ProductDetailModel.getAllProductDetailLimit((err, ProductDetail) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Lỗi truy vấn"
                                })
                            }
                            res.render("scoreTemp/add", { productGroup: productGroup, ProductDetail: ProductDetail, User: User[0] })
                        })
                    })
                }
            })
        }
    }
    add(req, res, next) {
        ScoreTempModel.findScoreTemAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            if (data.length === 0) {
                ScoreTempModel.create({
                    Code: req.body.Code,
                    Name: req.body.Name,
                    Note: req.body.Note,
                    IsActive: req.body.IsActive === true ? 1 : 0,
                    ProductGroup_id: req.body.ProductGroup_id,
                    CreatorUser_id: req.body.CreatorUser_id
                }, (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    ScoreTempModel.getOneScoreTemp(results.insertId, (err, data) => {
                        if (err) {

                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }

                        return res.status(201).json({
                            message: "Them thanh cong",
                            data: data[0]
                        })
                    })
                })
            } else {
                return res.status(400).json({
                    message: "Sản phẩm đã tồn tại"
                })
            }
        })
    }
    getOne(req, res) {
        const id = req.params.id
        ScoreTempModel.getOneScoreTemp(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            ProductGroupModel.fetchAllProductGroup((err, productGroup) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ProductDetailModel.getAllProductDetailLimit((err, ProductDetail) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    ScoreTempDetailModel.getScoreTempDetailByScoreTemp(data[0]?._id, (err, ScoreTempDetail) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }
                        ScoreTempDetailModel.getScoreTempDetailByTrash(data[0]?._id, (err, ScoreTempTrash) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Lỗi truy vấn"
                                })
                            }
                            res.render("scoreTemp/update", { ScoreTemp: data[0], productGroup: productGroup, ProductDetail: ProductDetail, ScoreTempDetail: ScoreTempDetail, ScoreTempTrash: ScoreTempTrash })
                        })
                    })
                })
            })
        })
    }
    update(req, res) {
        const id = req.params.id
        ScoreTempModel.findScoreTemUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            if (data.length === 0) {
                ScoreTempModel.updateScoreTemp(id, {
                    Code: req.body.Code,
                    Name: req.body.Name,
                    Note: req.body.Note,
                    IsActive: req.body.IsActive === true ? 1 : 0,
                    ProductGroup_id: req.body.ProductGroup_id
                }, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    return res.status(203).json({
                        message: "Cập nhật thành công"
                    })
                })
            } else {
                return res.status(400).json({
                    message: "Sản phẩm đã tồn tại"
                })
            }
        })
    }
    removeToTrash(req, res) {
        const id = req.params.id
        ScoreTempModel.removeToTrashScoreTemp(id, (err, results) => {
            if (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
            }
            return res.status(204).json({
                message: "Xóa thành công"
            })
        })
    }
    // khoi phuc
    revert(req, res) {
        const id = req.params.id
        ScoreTempModel.revertScoreTemp(id, (err, results) => {
            if (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
            }
            return res.status(204).json({
                message: "Khôi phục thành công"
            })
        })
    }
    // 
    pageTrash(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
                if (User?.[0].role_title.toLowerCase() !== "admin") {
                    res.redirect("/client")
                } else {
                    ScoreTempModel.getAllScoreTempFromTrash((err, ScoreTemp) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }
                        res.render("scoreTemp/trash", { User: User[0], ScoreTemp: ScoreTemp })
                    })
                }
            })
        }
    }
}

module.exports = new ScoreTempController