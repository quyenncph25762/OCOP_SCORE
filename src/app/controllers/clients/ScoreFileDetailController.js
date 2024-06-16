const ScoreFileDetailModel = require("../../models/scorefile/ScoreFileDetailModel")

class ScoreFileDetailController {
    getByScoreFileId = async (req, res) => {
        try {
            const scoreFileId = req.params.id
            const ListScoreFileDetail = await ScoreFileDetailModel.getByScoreFileId(scoreFileId)
            if (!ListScoreFileDetail) {
                return res.status(400).json({
                    message: "Không có list scoredetail nào"
                })
            }
            return res.status(200).json(ListScoreFileDetail)
        } catch (error) {
            console.log(error)
        }
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
    updateScoreById = async (req, res) => {
        try {
            for (const ScoreDetail of req.body) {
                await ScoreFileDetailModel.updateScoreFileDetailById(ScoreDetail)
            }
            return res.status(200).json({
                message: "Cập nhật thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ScoreFileDetailController