const connection = require("../../config/db")
const ScoreDetailModel = {
    getByScoreFileId: (id, callback) => {
        const query = `SELECT * FROM scorefile_detail WHERE ScoreFile_id = ?`
        connection.query(query, id, callback)
    },
    create: (scoreFileDetail, callback) => {
        const query = `INSERT INTO scorefile_detail (CreatorUser_id,Note,ScoreTempDetail_id,ScoreFile_id) VALUES (?,?,?,?)`
        const VALUES = [scoreFileDetail.CreatorUser_id, scoreFileDetail.Note, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.ScoreFile_id]
        connection.query(query, VALUES, callback)
    },
    update: (id, scoreFileDetail, callback) => {
        const query = `UPDATE scorefile_detail SET CreatorUser_id = ? , Note = ? , ScoreTempDetail_id = ? , ScoreFile_id = ? WHERE _id = ?`
        const VALUES = [scoreFileDetail.CreatorUser_id, scoreFileDetail.Note, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.ScoreFile_id, id]
        connection.query(query, VALUES, callback)
    },
}

module.exports = ScoreDetailModel