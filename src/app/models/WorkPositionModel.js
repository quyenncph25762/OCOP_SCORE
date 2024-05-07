const connection = require("../../config/db")

const WorkPositionModel = {
    // fetch tat ca
    fetchAllWorkPosition: (callback) => {
        const query = `SELECT * FROM workposition WHERE workposition.isDeleted = 0`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllWorkPositionFromTrash: (callback) => {
        const query = `SELECT * FROM workposition WHERE workposition.isDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddWorkPosition: (workPosition, callback) => {
        const query = `INSERT INTO workposition (title,code,manager,active,note) VALUES (?,?,?,?,?)`
        const values = [workPosition.title, workPosition.code, workPosition.manager, workPosition.active, workPosition.note]
        connection.query(query, values, callback)
    },
    // xoa vao thung rac
    deleteWorkPositionToTrash: (id, callback) => {
        const query = `UPDATE workposition SET isDeleted = 1 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa
    deleteWorkPosition: (id, callback) => {
        const query = `DELETE FROM workposition WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertWorkPosition: (id, callback) => {
        const query = `UPDATE workposition SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneWorkPosition: (id, callback) => {
        const query = `SELECT * FROM workposition WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateProductGroup: (id, workPosition, callback) => {
        const query = `UPDATE workposition SET code = ? , title = ? ,manager = ?, active = ? , note = ? WHERE _id=${id}`
        const values = [workPosition.code, workPosition.title, workPosition.manager, workPosition.active, workPosition.note]
        connection.query(query, values, callback)
    },
}

module.exports = WorkPositionModel