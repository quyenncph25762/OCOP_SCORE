const connection = require("../../../config/db")

const ScoreTempDetail = {
    getScoreTempDetailByScoreTemp: (id, callback) => {
        const query = `SELECT * FROM scoretemp_detail WHERE IsDeleted = 0 AND ScoreTemp_id = ? GROUP BY scoretemp_detail._id ASC`
        connection.query(query, id, callback)
    },
    getScoreTempDetailByTrash: (id, callback) => {
        const query = `SELECT * FROM scoretemp_detail WHERE IsDeleted = 1 AND ScoreTemp_id = ?`
        connection.query(query, id, callback)
    },
    getOneScoreTempDetailById: (id, callback) => {
        const query = `SELECT * FROM scoretemp_detail WHERE _id = ${id}`
        connection.query(query, callback)
    },
    // getOne
    deleteScoreTempDetailByScoreTemp: (id, callback) => {
        const query = `DELETE FROM scoretemp_detail WHERE ScoreTemp_id = ?`
        connection.query(query, id, callback)
    },
    create: (ScoreTempDetail) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO scoretemp_detail (Name,ScoreTemp_id,MaxScore,ProductDetailId,IsScore,ValidatedRank) VALUES (?,?,?,?,?,?)`
            const VALUES = [ScoreTempDetail.Name, ScoreTempDetail.ScoreTemp_id, ScoreTempDetail.MaxScore, ScoreTempDetail.ProductDetailId, ScoreTempDetail.IsScore, ScoreTempDetail.ValidatedRank]
            if (!connection) {
                return reject(new Error("Database connection is not established"));
            }
            connection.query(query, VALUES, (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err);
                }
                return resolve(result);
            });
        })
    },
    update: (_id, ScoreTempDetail) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE scoretemp_detail SET Name = ? , ScoreTemp_id = ? , MaxScore = ? , ProductDetailId = ? , IsScore = ? , ValidatedRank = ? , Note = ? WHERE _id = ?`
            const VALUES = [ScoreTempDetail.Name, ScoreTempDetail.ScoreTemp_id, ScoreTempDetail.MaxScore, ScoreTempDetail.ProductDetailId, ScoreTempDetail.IsScore, ScoreTempDetail.ValidatedRank, ScoreTempDetail.Note, _id]
            if (!connection) {
                return reject(new Error("Database connection is not established"));
            }
            connection.query(query, VALUES, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })

        })
    },
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
    // lay productDetail theo scorefile
    getScoreTempDetailByScoreFile: (scorefileId, callback) => {
        const query = `SELECT scoretemp_detail.* 
        FROM
            scorefile 
        JOIN 
            scorefile_detail 
        ON 
            scorefile_detail._id = scorefile_detail._id 
        JOIN 
            scoreTemp_detail 
        ON  
            scorefile_detail.ScoreTempDetail_id = scoreTemp_detail._id
        WHERE 
            scorefile._id =${scorefileId} AND scoreTemp_detail.ValidatedRank > 0 ;
        `
        connection.query(query, callback)
    }
}

module.exports = ScoreTempDetail