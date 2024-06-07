const ScoreTempDetailModel = require("../../models/scoretemp/ScoreDetailModel")

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
    // getOne by id
    getOne(req, res) {
        const id = req.params.id
        ScoreTempDetailModel.getOneScoreTempDetailById(id, (err, ScoreTempDetail) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(ScoreTempDetail?.[0])
        })
    }
    addScoreTempDetail(req, res) {
        ScoreTempDetailModel.create(req.body, (err, data) => {
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
        ScoreTempDetailModel.update(id, req.body, (err, data) => {
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