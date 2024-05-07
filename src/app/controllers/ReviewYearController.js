const YearReviewModel = require("../models/YearReviewModel")
class ReviewYearController {
    // fetchAll
    index(req, res, next) {
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

            res.render("yearreview/yearreview", { Review: data })
        })
    }
    getAllYearFromTrash(req, res, next) {
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
            res.render("yearreview/trash", { Review: Review })
        })
    }
    // them
    create(req, res, next) {
        YearReviewModel.AddYear({
            yearName: req.body.yearName,
            status: req.body.status ? 1 : 0,
            note: req.body.note
        }, (err, data) => {
            if (err) {
                console.error('Lỗi thêm sản phẩm:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('Sản phẩm đã được thêm thành công:');
                res.redirect('back')
            }
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const id = req.params.id
        YearReviewModel.deleteYearToTrash(id, (err, result) => {
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
    // xoa
    remove(req, res, next) {
        console.log(req.params.id)
        const id = req.params.id
        YearReviewModel.deleteYear(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                res.redirect('back')
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
        console.log(req.body)
        const id = req.params.id
        YearReviewModel.updateYear(id, ({
            yearName: req.body.yearName,
            note: req.body.note,
            status: req.body.status === 'on' ? 1 : 0
        }), (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: `${err}: Loi updateYear`
                })
            }
            return res.status(200).json(res.redirect("back"))
        })

    }
}

module.exports = new ReviewYearController