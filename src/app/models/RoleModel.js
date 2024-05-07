const connection = require("../../config/db")
const RoleModel = {
    // fetch tat ca
    fetchAllRole: (callback) => {
        const query = `SELECT * FROM role WHERE role.isDeleted = 0`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllRoleFromTrash: (callback) => {
        const query = `SELECT * FROM role WHERE role.isDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddRole: (role, callback) => {
        const query = `INSERT INTO role (title,status,note) VALUES (?,?,?)`
        const values = [role.title, role.status, role.note]
        connection.query(query, values, callback)
    },
    // xoa vao thung rac
    deleteRoleToTrash: (id, callback) => {
        const query = `UPDATE role SET isDeleted = 1 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa
    deleteRole: (id, callback) => {
        const query = `DELETE FROM role WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertRole: (id, callback) => {
        const query = `UPDATE role SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneRole: (id, callback) => {
        const query = `SELECT * FROM role WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateRole: (id, role, callback) => {
        const query = `UPDATE role SET title = ? , status = ? , note = ? WHERE _id=${id}`
        const values = [role.title, role.status, role.note]
        connection.query(query, values, callback)
    },
}

module.exports = RoleModel