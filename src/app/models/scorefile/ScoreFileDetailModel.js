const connection = require("../../../config/db")
const ScoreDetailModel = {
    getByScoreFileId: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                scorefile_detail.*,
                scoretemp_detail.Name AS scoreTempDetail_name,
                scoretemp_detail.MaxScore AS scoreTempDetail_maxScore,
                scoretemp_detail.IsScore AS scoreTempDetail_isScore,
                scoretemp_detail.ProductDetailId AS scoreTempDetail_productDetailId,
                scoretemp_detail.ValidatedRank AS scoreTempDetail_validateRank,
                product_detail.code AS scoreTempDetail_productDetailCode
            FROM 
                scorefile_detail
            LEFT JOIN 
                scoretemp_detail ON scoretemp_detail._id = scorefile_detail.ScoreTempDetail_id 
            LEFT JOIN 
                product_detail ON product_detail._id = scoretemp_detail.ProductDetailId
            WHERE 
                ScoreFile_id = ${id} ORDER BY scorefile_detail.ScoreTempDetail_id ASC
        `;
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                }
                return resolve(results)
            })
        })
    },
    create: (scoreFileDetail) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO scorefile_detail (CreatorUser_id, ScoreTempDetail_id, Score, ScoreFile_id) VALUES (?,?,?,?)
            `;
            const values = [
                scoreFileDetail.CreatorUser_id,
                scoreFileDetail.ScoreTempDetail_id,
                scoreFileDetail.Score,
                scoreFileDetail.ScoreFile_id
            ];
            // Kiểm tra kết nối cơ sở dữ liệu trước khi thực hiện truy vấn
            if (!connection) {
                return reject(new Error("Database connection is not established"));
            }
            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },
    // update: (id, scoreFileDetail, callback) => {
    //     const query = `UPDATE scorefile_detail SET CreatorUser_id = ? ,ScoreTempDetail_id = ? , ScoreFile_id = ? WHERE _id = ?`
    //     const VALUES = [scoreFileDetail.CreatorUser_id, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.ScoreFile_id, id]
    //     connection.query(query, VALUES, callback)
    // },
    updateScoreFileDetailById: (ScoreFileDetail) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE scorefile_detail SET Score = ? WHERE _id = ${ScoreFileDetail.id}`
            const VALUES = [ScoreFileDetail.Score]
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
    // lay ra scorefileDetail da cham diem
    getScoreFileDetailScoreByScoreFile: (id, callback) => {
        const query = `SELECT * FROM scorefile_detail WHERE Score IS NOT NULL AND ScoreFile_id = ?`
        connection.query(query, [id], callback)
    }
}

module.exports = ScoreDetailModel