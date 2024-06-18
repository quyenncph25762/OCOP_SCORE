const AccountModel = require("../../models/Account")
const ProductDetailModel = require("../../models/product/ProductDetailModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
const ProductGroupModel = require("../../models/productgroup/ProductGroupModel")
const ScoreTempModel = require("../../models/scoretemp/ScoreTempModel")
const ScoreTempDetailModel = require("../../models/scoretemp/ScoreDetailModel")
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
                ScoreTempModel.getAllScoreTemp((err, ScoreTemp) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    res.render("scoreTemp/scoreTemp", { User: User[0], ScoreTemp: ScoreTemp })
                })
            })
        }

    }
    // lay scoretemp theo productgroup
    getScoreTempByProductGroup(req, res) {
        const productgroup_code = req.params.code
        ScoreTempModel.getScoreTempByProductGroup(productgroup_code, (err, scoretemp) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy xuất"
                })
            }
            return res.status(200).json(scoretemp?.[0])
        })
    }
    // lay scoretemp theo productgroupId
    getScoreTempByProductGroupId(req, res) {
        const idProductGroup = req.params.id
        ScoreTempModel.getScoreTempByProductGroupId(idProductGroup, (err, scoretemp) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy xuất"
                })
            }
            return res.status(200).json(scoretemp?.[0])
        })
    }
    // trang them scoretemp
    addPage(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy xuất"
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
                        res.render("scoreTemp/add", { productGroup: productGroup, ProductDetail: ProductDetail, User: User[0] })
                    })
                })
            })
        }
    }
    // actions them
    add(req, res, next) {
        ScoreTempModel.findScoreTemAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            if (data.length === 0) {
                ScoreTempModel.create(req.body, (err, results) => {
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
    // lay 1 scoreTemp
    getOne(req, res) {
        console.log(1)
        const id = req.params.id
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
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
                                    res.render("scoreTemp/update", { ScoreTemp: data[0], productGroup: productGroup, ProductDetail: ProductDetail, ScoreTempDetail: ScoreTempDetail, ScoreTempTrash: ScoreTempTrash, User: User[0] })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
    // getOneAction
    getOneAction(req, res) {
        const id = req.params.id
        ScoreTempModel.getOneScoreTemp(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(data[0])
        })
    }
    // cap nhat
    update(req, res) {
        const id = req.params.id
        ScoreTempModel.findScoreTemUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            if (data.length === 0) {
                ScoreTempModel.updateScoreTemp(id, req.body, (err, data) => {
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
    // action xoa vao thug rac
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
    // Xoa nhieu
    removeToTrashAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await ScoreTempModel.removeToTrashScoreTempAll(id)
            }
            return res.status(204).json({
                message: "Xóa thành công"
            })
        } catch (error) {
            console.log(error)
        }
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
    // khoi phuc nhieu
    revertAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await ScoreTempModel.revertScoreTempAll(id)
            }
            return res.status(204).json({
                message: "Khoi phuc thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // trang chua cac scoretemp isDeleted = 1
    pageTrash(req, res) {
        console.log("Hello world")
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
                ScoreTempModel.getAllScoreTempFromTrash((err, ScoreTemp) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    res.render("scoreTemp/trash", { User: User[0], ScoreTemp: ScoreTemp })
                })
            })
        }
    }
}

module.exports = new ScoreTempController