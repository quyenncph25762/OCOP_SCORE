const connection = require("../../config/db")

const ScoreTempDetail = {
    getScoreTempDetailByScoreTemp: (id, callback) => {
        const query = `SELECT * FROM scoretemp_detail WHERE IsDeleted = 0 AND ScoreTemp_id = ?`
        connection.query(query, id, callback)
    },
    getScoreTempDetailByTrash: (id, callback) => {
        const query = `SELECT * FROM scoretemp_detail WHERE IsDeleted = 1 AND ScoreTemp_id = ?`
        connection.query(query, id, callback)
    },
    deleteScoreTempDetailByScoreTemp: (id, callback) => {
        const query = `DELETE FROM scoretemp_detail WHERE ScoreTemp_id = ?`
        connection.query(query, id, callback)
    },
    create: (ScoreTempDetail, callback) => {
        const query = `INSERT INTO scoretemp_detail (Name,ScoreTemp_id,MaxScore,ProductDetailId,IsScore,ValidatedRank) VALUES (?,?,?,?,?,?)`
        const VALUES = [ScoreTempDetail.Name, ScoreTempDetail.ScoreTemp_id, ScoreTempDetail.MaxScore, ScoreTempDetail.ProductDetailId, ScoreTempDetail.IsScore, ScoreTempDetail.validatedRank]
        connection.query(query, VALUES, callback)
    },
    update: (_id, ScoreTempDetail, callback) => {
        const query = `UPDATE scoretemp_detail SET Name = ? , ScoreTemp_id = ? , MaxScore = ? , ProductDetailId = ? , IsScore = ? , ValidatedRank = ? WHERE _id = ?`
        const VALUES = [ScoreTempDetail.Name, ScoreTempDetail.ScoreTemp_id, ScoreTempDetail.MaxScore, ScoreTempDetail.ProductDetailId, ScoreTempDetail.IsScore, ScoreTempDetail.validatedRank, _id]
        connection.query(query, VALUES, callback)
    },
    // cap nhat
    // khoi phuc
    revertScoreTempDetail: (id, callback) => {
        const query = `UPDATE scoretemp_detail SET IsDeleted = 0 WHERE _id = ${id}`
        connection.query(query, id, callback)
    },
    // removeToTrash
    removeToTrashScoreTempDetail: (id, callback) => {
        const query = `UPDATE scoretemp_detail SET IsDeleted = 1 WHERE _id = ?`
        connection.query(query, [id], callback)
    },
    // removeToTrash
    deleteScoreTempDetail: (id, callback) => {
        const query = `DELETE FROM scoretemp_detail WHERE _id = ?`
        connection.query(query, [id], callback)
    },
}

module.exports = ScoreTempDetail