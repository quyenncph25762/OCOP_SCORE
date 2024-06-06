const connection = require("../../../config/db")

const ScoreTempModel = {

    getAllScoreTemp: (callback) => {
        const query = `SELECT 
        scoretemp .*,
        productgroup.Name AS productgroup_name,
        productgroup.IsDeleted AS productgroup_IsDeleted
        FROM
        scoretemp
        JOIN
        productgroup ON productgroup._id = scoretemp.ProductGroup_id
        WHERE scoretemp.IsDeleted = 0
        `
        connection.query(query, callback)
    },
    // getScoreTemp theo productgroup
    getScoreTempByProductGroup: (productGroup_code, callback) => {
        const query = `SELECT * FROM scoretemp WHERE IsDeleted = 0 AND Code = '${productGroup_code}'`
        connection.query(query, callback)
    },
    getScoreTempByProductGroupId: (getScoreTempByProductGroupId, callback) => {
        const query = `SELECT * FROM scoretemp WHERE IsDeleted = 0 AND ProductGroup_id = '${getScoreTempByProductGroupId}'`
        connection.query(query, callback)
    },
    // tat ca phieu tu thung rac
    getAllScoreTempFromTrash: (callback) => {
        const query = `SELECT 
        scoretemp .*,
        productgroup.Name AS productgroup_name,
        productgroup.IsDeleted AS productgroup_IsDeleted
        FROM
        scoretemp
        JOIN
        productgroup ON productgroup._id = scoretemp.ProductGroup_id
        WHERE scoretemp.IsDeleted = 1
        `
        connection.query(query, callback)
    },
    // getOne
    getOneScoreTemp: (id, callback) => {
        const query = `SELECT * FROM scoretemp WHERE _id = ?`
        connection.query(query, [id], callback)
    },
    // removeToTrash
    removeToTrashScoreTemp: (id, callback) => {
        const query = `UPDATE scoretemp SET IsDeleted = 1 WHERE _id = ?`
        connection.query(query, [id], callback)
    },
    // add
    create: (ScoreTemp, callback) => {
        const query = `INSERT INTO scoretemp (Code,Name,Note,IsActive,ProductGroup_id,CreatorUser_id) VALUES (?,?,?,?,?,?)`
        const VALUES = [ScoreTemp.Code, ScoreTemp.Name, ScoreTemp.Note, ScoreTemp.IsActive, ScoreTemp.ProductGroup_id, ScoreTemp.CreatorUser_id]
        connection.query(query, VALUES, callback)
    },
    // Find One
    findScoreTemAdd: (ScoreTemp, callback) => {
        const query = 'SELECT * FROM customer WHERE  Name = ? ';
        const values = [ScoreTemp.Name];
        connection.query(query, values, callback);
    },
    findScoreTemUpdate: (id, ScoreTemp, callback) => {
        const query = `SELECT * FROM customer WHERE  Name = ? AND _id != ${id}`;
        const values = [ScoreTemp.Name];
        connection.query(query, values, callback);
    },
    // cap nhat
    updateScoreTemp: (id, ScoreTemp, callback) => {
        const query = `UPDATE scoretemp SET Code = ? , Name = ? , Note = ? , IsActive = ?, ProductGroup_id = ? WHERE _id = ${id}`
        const VALUES = [ScoreTemp.Code, ScoreTemp.Name, ScoreTemp.Note, ScoreTemp.IsActive, ScoreTemp.ProductGroup_id]
        connection.query(query, VALUES, callback)
    },
    // khoi phuc
    revertScoreTemp: (id, callback) => {
        const query = `UPDATE scoretemp SET IsDeleted = 0 WHERE _id = ${id}`
        connection.query(query, id, callback)
    },
}

module.exports = ScoreTempModel