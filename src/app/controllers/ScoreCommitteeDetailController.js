const ScoreCommitteeDetailModel = require("../models/ScoreCommitteeDetailModel")

class ScoreCommittDetailController {
    getByScoreCommitteeId(req, res) {
        const scoreCommitteeId = req.params.id
        ScoreCommitteeDetailModel.getByScoreCommittee(scoreCommitteeId, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(200).json(data)
        })
    }
    create(req, res) {
        console.log(1)
        console.log(req.body)
        ScoreCommitteeDetailModel.create(req.body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(201).json({
                message: "Tạo mới thành công"
            })
        })
    }
    update(req, res) {
        const id = req.params.id
        ScoreCommitteeDetailModel.update(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(201).json({
                message: "Tạo mới thành công"
            })
        })
    }
}

module.exports = new ScoreCommittDetailController