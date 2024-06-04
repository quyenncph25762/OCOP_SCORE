const connection = require("../../../config/db")

const ScoreFileModel = {
    getAll: (callback) => {
        const query = `
    SELECT 
        scorefile.*,
        product.Name AS product_name,
        product.Avatar AS product_avatar,
        customer.Name AS customer_name,
        productgroup.Name AS productgroup_name,   
        productgroup.Code AS productgroup_code,
        DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate
    FROM scorefile
    LEFT JOIN product ON product._id = scorefile.Product_id
    LEFT JOIN customer ON customer._id = product.Customer_id
    LEFT JOIN productgroup ON productgroup._id = product.ProductGroup_id
    WHERE scorefile.IsDeleted = 0 AND scorefile.IsActive = 1
`;
        connection.query(query, callback);
    },
    getScoreFileByStatus: (callback) => {
        const query = `SELECT * FROM scorefile WHERE Status = 0 AND	IsDeleted = 0`
        connection.query(query, callback)
    },
    getOne: (id, callback) => {
        const query = `
    SELECT 
        scorefile.*,
        product.Name AS product_name,
        product.Avatar AS product_avatar,
        customer.Name AS customer_name,
        productgroup.Name AS productgroup_name,   
        productgroup.Code AS productgroup_code,
        DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate
    FROM scorefile
    LEFT JOIN product ON product._id = scorefile.Product_id
    LEFT JOIN customer ON customer._id = product.Customer_id
    LEFT JOIN productgroup ON productgroup._id = product.ProductGroup_id
    WHERE scorefile.IsDeleted = 0 AND scorefile.IsActive = 1 AND scorefile._id  = ?
`
        connection.query(query, id, callback)
    },
    create: (scoreFile, callback) => {
        const query = `INSERT INTO scorefile (RankOcop,ScoreTotal,ScoreTemp_id,Employee_id,EmployeeUserId,Product_id,Customer_id,ScoreCommitee_id,CreatorUser_id,Note,Name,Code,IsActive) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const VALUES = [scoreFile.RankOcop, scoreFile.ScoreTotal, scoreFile.ScoreTemp_id, scoreFile.Employee_id, scoreFile.EmployeeUserId, scoreFile.Product_id, scoreFile.Customer_id, scoreFile.ScoreCommitee_id, scoreFile.CreatorUser_id, scoreFile.Note, scoreFile.Name, scoreFile.Code, scoreFile.IsActive]
        connection.query(query, VALUES, callback)
    },
    update: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET RankOcop = ? , ScoreTotal = ?,ScoreTemp_id = ?,Employee_id = ?,EmployeeUserId = ?,Product_id = ? , Customer_id = ?, ScoreCommitee_id = ? , Status = ? , CreatorUser_id = ? , Note = ? , Name = ? , Code = ? , IsActive = ? ,ScoreDate = ? WHERE _id = ?`
        const VALUES = [scoreFile.RankOcop, scoreFile.ScoreTotal, scoreFile.ScoreTemp_id, scoreFile.Employee_id, scoreFile.EmployeeUserId, scoreFile.Product_id, scoreFile.Customer_id, scoreFile.ScoreCommitee_id, scoreFile.Status, scoreFile.CreatorUser_id, scoreFile.Note, scoreFile.Name, scoreFile.Code, scoreFile.IsActive, scoreFile.ScoreDate, id]
        connection.query(query, VALUES, callback)
    },
    updateScoreCommitteOnScoreFile: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET ScoreCommitee_id = ? WHERE _id = ${id}`
        const VALUES = [scoreFile.ScoreCommitee_id]
        connection.query(query, VALUES, callback)
    },
    updateScoreTotal: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET ScoreTotal = ? WHERE _id = ${id}`
        const VALUES = [scoreFile.ScoreTotal]
        connection.query(query, VALUES, callback)
    },

}

module.exports = ScoreFileModel