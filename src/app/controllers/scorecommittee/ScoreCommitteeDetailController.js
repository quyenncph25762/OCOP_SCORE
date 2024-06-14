const ScoreCommitteeDetailModel = require("../../models/scoreCommittee/ScoreCommitteeDetailModel")

class ScoreCommittDetailController {
    getByScoreCommitteeId(req, res) {
        const scoreCommitteeId = req.params.id
        ScoreCommitteeDetailModel.getByScoreCommittee(scoreCommitteeId, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(data)
        })
    }
    create = async (req, res) => {
        try {
            for (const data of req.body) {
                await ScoreCommitteeDetailModel.create(data)
            }
            return res.status(201).json({
                message: "Tạo mới thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    update(req, res) {
        const id = req.params.id
        ScoreCommitteeDetailModel.update(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công"
            })
        })
    }
    delete(req, res) {
        const id = req.params.id
        ScoreCommitteeDetailModel.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Xóa thành công"
            })
        })
    }
}

module.exports = new ScoreCommittDetailController