const ScoreTempDetailModel = require("../models/ScoreDetailModel")

class ScoreTempDetailController {
    getScoreTempDetailFilter(req, res) {
        const id = req.params.id
        ScoreTempDetailModel.getScoreTempDetailByScoreTemp(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(data)
        })
    }
    addScoreTempDetail(req, res) {
        ScoreTempDetailModel.create({
            IsIsActive: req.body.IsActive === true ? 1 : 0,
            IsScore: req.body.IsScore === true ? 1 : 0,
            ...req.body
        }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(201).json({
                message: "Thêm thành công"
            })
        })
    }
    updateScoreTempDetail(req, res) {
        const id = req.params.id
        ScoreTempDetailModel.update(id, {
            IsScore: req.body.IsScore === true ? 1 : 0,
            ValidatedRank: req.body.ValidatedRank,
            ...req.body
        }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(201).json({
                message: "Cập nhật thành công"
            })
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res) {
        const id = req.params.id
        ScoreTempDetailModel.removeToTrashScoreTempDetail(id, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(201).json({
                message: "Xóa thành công"
            })
        })
    }
    // khoi phuc
    revert(req, res) {
        const id = req.params.id
        ScoreTempDetailModel.revertScoreTempDetail(id, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(201).json({
                message: "Khôi phục thành công"
            })
        })
    }
    // xoa vinh vien
    remove(req, res) {
        const id = req.params.id
        ScoreTempDetailModel.deleteScoreTempDetail(id, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(201).json({
                message: "Khôi phục thành công"
            })
        })
    }
}

module.exports = new ScoreTempDetailController