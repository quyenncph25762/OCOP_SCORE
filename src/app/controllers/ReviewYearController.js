const YearReviewModel = require("../models/YearReviewModel")
const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class ReviewYearController {
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
                YearReviewModel.fetchAllReviewYear((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!data) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }

                    res.render("yearreview/yearreview", { Review: data, User: User[0] })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    getAllYearFromTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                YearReviewModel.fetchAllYearFromTrash((err, Review) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!Review) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }
                    res.render("yearreview/trash", { Review: Review, User: User[0] })
                })
            })
        }

    }
    // them
    create(req, res, next) {
        YearReviewModel.findYearAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            }
            if (data.length === 0) {
                YearReviewModel.AddYear({
                    yearName: req.body.yearName,
                    status: req.body.status === "true" ? 1 : 0,
                    note: req.body.note,
                    creatorUser_id: req.body.creatorUser_id
                }, (err, data) => {
                    if (err) {
                        console.error('Lỗi thêm sản phẩm:', err);
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
                    message: 'Gía trị đã tồn tại'
                });
            }
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            const id = req.params.id
            YearReviewModel.deleteYearToTrash(id, UserDataCookie?._id, (err, result) => {
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
        console.log(req.params.id)
        const id = req.params.id
        YearReviewModel.deleteYear(id, (err, result) => {
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
        YearReviewModel.revertYear(id, (err, data) => {
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
        YearReviewModel.findYearUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            }
            if (data.length === 0) {
                YearReviewModel.updateYear(id, ({
                    yearName: req.body.yearName,
                    note: req.body.note,
                    status: req.body.status === 'true' ? 1 : 0
                }), (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            message: `${err}: Loi updateYear`
                        })
                    }
                    return res.status(203).json({
                        message: 'Sửa thành công'
                    });
                })
            } else {
                return res.status(500).json({
                    message: "Gía trị đã tồn tại"
                })
            }
        })
    }
}

module.exports = new ReviewYearController