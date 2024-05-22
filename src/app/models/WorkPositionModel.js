const connection = require("../../config/db")

const WorkPositionModel = {
    // fetch tat ca
    fetchAllWorkPosition: (callback) => {
        const query = `SELECT * FROM workposition WHERE workposition.IsDeleted = 0 ORDER BY workposition._id DESC`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllWorkPositionFromTrash: (callback) => {
        const query = `SELECT * FROM workposition WHERE workposition.IsDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddWorkPosition: (workPosition, callback) => {
        const query = `INSERT INTO workposition (Name,Code,IsManager,IsActive,Note,CreatorUser_id,CreationTime) VALUES (?,?,?,?,?,?,?)`
        const values = [workPosition.Name, workPosition.Code, workPosition.IsManager, workPosition.IsActive, workPosition.Note, workPosition.CreatorUser_id, workPosition.CreationTime]
        connection.query(query, values, callback)
    },
    // tim kiem vi tri
    findWorkPositionAdd: (workPosition, callback) => {
        const query = 'SELECT * FROM workposition WHERE Name = ? ';
        const values = [workPosition.Name];
        connection.query(query, values, callback);
    },
    findWorkPositionUpdate: (id, workPosition, callback) => {
        const query = `SELECT * FROM workposition WHERE Name = ? AND _id != ${id}`;
        const values = [workPosition.Name];
        connection.query(query, values, callback);
    },
    // xoa vao thung rac
    deleteWorkPositionToTrash: (id, userId, callback) => {
        const query = `UPDATE workposition SET IsDeleted = 1 , DeletedUser_id = ${userId} , deletionTime = CURRENT_TIMESTAMP WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // xoa
    deleteWorkPosition: (id, callback) => {
        const query = `DELETE FROM workposition WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertWorkPosition: (id, callback) => {
        const query = `UPDATE workposition SET IsDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneWorkPosition: (id, callback) => {
        const query = `SELECT * FROM workposition WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateProductGroup: (id, workPosition, callback) => {
        const query = `UPDATE workposition SET Name = ? , Code = ? , IsManager = ?, IsActive = ? , Note = ?  WHERE _id=${id}`
        const values = [workPosition.Name, workPosition.Code, workPosition.IsManager, workPosition.IsActive, workPosition.Note, id]
        connection.query(query, values, callback)
    },
}

module.exports = WorkPositionModel