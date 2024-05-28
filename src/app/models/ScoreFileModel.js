const connection = require("../../config/db")

const ScoreFileModel = {
    getAll: (callback) => {
        const query = `SELECT * FROM scorefile WHERE IsDeleted = 0`
        connection.query(query, callback)
    },
    getOne: (id, callback) => {
        const query = `SELECT * FROM scorefile WHERE _id = ?`
        connection.query(query, id, callback)
    },
    create: (scoreFile, callback) => {
        const query = `INSERT INTO scorefile (RankOcop,ScoreTotal,ScoreTemp_id,ScoreDate,Employee_id,Product_id ,
            Customer_id,ScoreCommitee_id,Status,CreatorUser_id,Note,Name,Code,IsActive,AttachFileName,AttachFileUrl
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const VALUES = [scoreFile.RankOcop, scoreFile.ScoreTotal, scoreFile.ScoreTemp_id, scoreFile.ScoreDate, scoreFile.Employee_id, scoreFile.Product_id, scoreFile.Customer_id, scoreFile.ScoreCommitee_id, scoreFile.Status, scoreFile.CreatorUser_id, scoreFile.Note, scoreFile.Name, scoreFile.Code, scoreFile.IsActive, scoreFile.AttachFileName, scoreFile.AttachFileUrl]
        connection.query(query, VALUES, callback)
    },
    update: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET RankOcop = ? , ScoreTotal = ?,ScoreTemp_id = ?,ScoreDate = ?,Employee_id = ?,Product_id = ? , Customer_id = ?, ScoreCommitee_id = ? , Status = ? , CreatorUser_id = ? , Note = ? , Name = ? , Code = ? , IsActive = ? , AttachFileName = ? , AttachFileUrl = ? WHERE _id = ?`
        const VALUES = [scoreFile.RankOcop, scoreFile.ScoreTotal, scoreFile.ScoreTemp_id, scoreFile.ScoreDate, scoreFile.Employee_id, scoreFile.Product_id, scoreFile.Customer_id, scoreFile.ScoreCommitee_id, scoreFile.Status, scoreFile.CreatorUser_id, scoreFile.Note, scoreFile.Name, scoreFile.Code, scoreFile.IsActive, scoreFile.AttachFileName, scoreFile.AttachFileUrl, id]
        connection.query(query, VALUES, callback)
    },
}

module.exports = ScoreFileModel