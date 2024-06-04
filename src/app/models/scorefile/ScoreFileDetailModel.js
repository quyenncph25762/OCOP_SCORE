const connection = require("../../../config/db")
const ScoreDetailModel = {
    getByScoreFileId: (id, callback) => {
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
            ScoreFile_id = ?
    `;
        connection.query(query, id, callback)
    },
    create: (scoreFileDetail, callback) => {
        const query = `INSERT INTO scorefile_detail (CreatorUser_id,ScoreTempDetail_id,Score,ScoreFile_id) VALUES (?,?,?,?)`
        const VALUES = [scoreFileDetail.CreatorUser_id, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.Score, scoreFileDetail.ScoreFile_id]
        connection.query(query, VALUES, callback)
    },
    // update: (id, scoreFileDetail, callback) => {
    //     const query = `UPDATE scorefile_detail SET CreatorUser_id = ? ,ScoreTempDetail_id = ? , ScoreFile_id = ? WHERE _id = ?`
    //     const VALUES = [scoreFileDetail.CreatorUser_id, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.ScoreTempDetail_id, scoreFileDetail.ScoreFile_id, id]
    //     connection.query(query, VALUES, callback)
    // },
    updateScoreFileDetailById: (id, ScoreFileDetail, callback) => {
        const query = `UPDATE scorefile_detail SET Score = ? WHERE _id = ${id}`
        const VALUES = [ScoreFileDetail.Score]
        connection.query(query, VALUES, callback)
    }
}

module.exports = ScoreDetailModel