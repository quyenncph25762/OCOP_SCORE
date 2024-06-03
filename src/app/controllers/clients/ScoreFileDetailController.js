const ScoreFileDetailModel = require("../../models/scorefile/ScoreFileDetailModel")

class ScoreFileDetailController {
    getByScoreFileId(req, res) {
        const scoreFileId = req.params.id
        ScoreFileDetailModel.getByScoreFileId(scoreFileId, (err, ListScoreFileDetail) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(ListScoreFileDetail)
        })
    }
    createScoreFileDetail(req, res) {
        console.log(req.body)
        ScoreFileDetailModel.create(req.body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(201).json({
                message: "Thêm thành công"
            })
        })
    }
    // updateScoreFileDetail(req, res) {
    //     const id = req.params.id
    //     if (id) {
    //         ScoreFileDetailModel.update(id, req.body, (err, ListScoreFileDetail) => {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: "Lỗi truy vấn"
    //                 })
    //             }
    //             return res.status(200).json({
    //                 message: "Cập nhật thành công"
    //             })
    //         })
    //     } else {
    //         return res.status(200).json({
    //             message: "Không tìm thấy phiếu chấm"
    //         })
    //     }
    // }
    updateScoreById(req, res) {
        const id = req.params.id
        if (id) {
            ScoreFileDetailModel.updateScoreById(id, req.body, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
                return res.status(200).json(data[0])
            })
        }
    }
}

module.exports = new ScoreFileDetailController