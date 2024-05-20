const ScoreFileDetailModel = require("../../models/ScoreFileDetailModel")

class ScoreFileDetailController {
    getByScoreFileId(req, res) {
        const scoreFileId = req.params.id
        ScoreFileDetailModel.getByScoreFileId(scoreFileId, (err, ListScoreFileDetail) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(ListScoreFileDetail)
        })
    }
    createScoreFileDetail(req, res) {
        ScoreFileDetailModel.create(req.body, (err, ListScoreFileDetail) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(ListScoreFileDetail)
        })
    }
    updateScoreFileDetail(req, res) {
        const id = req.params.id
        if (id) {
            ScoreFileDetailModel.create(id, req.body, (err, ListScoreFileDetail) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
                return res.status(200).json({
                    message: "Cập nhật thành công",
                    ListScoreFileDetail
                })
            })
        } else {
            return res.status(200).json({
                message: "Không tìm thấy phiếu chấm"
            })
        }
    }
}

module.exports = new ScoreFileDetailController