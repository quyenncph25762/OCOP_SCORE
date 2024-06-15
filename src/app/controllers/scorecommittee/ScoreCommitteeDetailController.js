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
    update = async (req, res) => {
        try {
            for (const item of req.body) {
                await ScoreCommitteeDetailModel.update(item)
            }
            return res.status(203).json({
                message: "Cập nhật thành công"
            })
        } catch (error) {
            console.log(error)
        }

    }
    delete = async (req, res) => {
        try {
            for (const item of req.body) {
                await ScoreCommitteeDetailModel.delete(item)
            }
            return res.status(203).json({
                message: "Xóa thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ScoreCommittDetailController