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
    addScoreTempDetail = async (req, res) => {
        try {
            for (const item of req.body) {
                await ScoreTempDetailModel.create(item)
            }
            return res.status(201).json({
                message: "Thêm thành công"
            })
        } catch (error) {
            console.log(error)
        }

    }
    updateScoreTempDetail = async (req, res) => {
        try {
            for (const item of req.body) {
                const { ScoreTempDetailId, ...data } = item
                await ScoreTempDetailModel.update(ScoreTempDetailId, data)
            }
            return res.status(201).json({
                message: "Cập nhật thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // xoa vao thung rac
    removeToTrash = async (req, res) => {
        try {
            for (const id of req.body) {
                await ScoreTempDetailModel.removeToTrashScoreTempDetail(id)
            }
            return res.status(201).json({
                message: "Xóa thành công"
            })
        } catch (error) {
            console.log(error)
        }
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
    revertAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await ScoreTempDetailModel.revertScoreTempDetailAll(id)
            }
            return res.status(201).json({
                message: "Khôi phục thành công"
            })
        } catch (error) {
            console.log(error)
        }
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
                message: "Xóa thành công"
            })
        })
    }
    removeAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await ScoreTempDetailModel.deleteScoreTempDetailAll(id)
            }
            return res.status(201).json({
                message: "Xóa thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // lay scoreDetail theo scorefile
    getScoreDetailByScoreFile(req, res) {
        const scoreFileId = req.params.id
        ScoreTempDetailModel.getScoreTempDetailByScoreFile(scoreFileId, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(data)
        })
    }

}

module.exports = new ScoreTempDetailController