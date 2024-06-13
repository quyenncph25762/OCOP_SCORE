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
    // lay tat ca scorefileDetail da cham theo scorefile
    getIsScoreByScoreFile(req, res) {
        const scorefileId = req.params.id
        ScoreFileDetailModel.getScoreFileDetailScoreByScoreFile(scorefileId, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(data)
        })
    }
    // tao moi
    createScoreFileDetail = async (req, res) => {
        try {
            for (const item of req.body) {
                await ScoreFileDetailModel.create(item);
            }
            return res.status(201).json({ message: "ScoreFileDetail created successfully" });
        } catch (error) {
            console.error('Error creating ScoreFileDetail:', error);
            return res.status(500).json({ message: "Error creating ScoreFileDetail", error: error.message });
        }

    }
    updateScoreById(req, res) {
        const id = req.params.id
        if (id) {
            ScoreFileDetailModel.updateScoreFileDetailById(id, req.body, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn"
                    })
                }
                return res.status(200).json({
                    message: "Cập nhật thành công"
                })
            })
        }
    }
}

module.exports = new ScoreFileDetailController