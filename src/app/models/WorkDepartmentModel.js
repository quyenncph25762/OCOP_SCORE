const connection = require("../../config/db")
const WorkDepartmentModel = {
    // fetch tat ca
    fetchAllWorkDepartment: (callback) => {
        const query = `SELECT * FROM workdepartment WHERE workdepartment.isDeleted = 0`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllWorkDepartmentFromTrash: (callback) => {
        const query = `SELECT * FROM workdepartment WHERE workdepartment.isDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddWorkDepartment: (workdepartment, callback) => {
        const query = `INSERT INTO workdepartment (title,code,description) VALUES (?,?,?)`
        const values = [workdepartment.title, workdepartment.code, workdepartment.description]
        connection.query(query, values, callback)
    },
    // xoa vao thung rac
    deleteWorkDepartmentToTrash: (id, callback) => {
        const query = `UPDATE workdepartment SET isDeleted = 1 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa
    deleteWorkDepartment: (id, callback) => {
        const query = `DELETE FROM workdepartment WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertWorkDepartment: (id, callback) => {
        const query = `UPDATE workdepartment SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneWorkDepartment: (id, callback) => {
        const query = `SELECT * FROM workdepartment WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateWorkDepartment: (id, workdepartment, callback) => {
        const query = `UPDATE workdepartment SET code = ? , title = ? , description = ? WHERE _id=${id}`
        const values = [workdepartment.code, workdepartment.title, workdepartment.description]
        connection.query(query, values, callback)
    },
}

module.exports = WorkDepartmentModel