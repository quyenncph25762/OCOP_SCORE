const connection = require("../../../config/db")
const PermissionModel = {
    getAllPermissionBy_Role: (Role_id, callback) => {
        const query = `SELECT * FROM role_permission WHERE Role_id =  ? AND IsDeleted = 0`
        connection.query(query, Role_id, callback)
    },
    getAllPermissionBy_Role_And_Name: (Role_id, Name, callback) => {
        console.log(Name)
        const query = `SELECT role_permission.*
        FROM role_permission
        JOIN role ON role_permission.Role_id = role._id
        WHERE role_permission.Role_id =  ? AND role_permission.NamePermission = ? AND role_permission.IsDeleted = 0 AND role.IsDeleted =0`
        connection.query(query, [Role_id, Name], callback)
    },
    creatPermission: (permission, callback) => {
        const query = `INSERT INTO role_permission (Role_id,NamePermission) VALUES (?,?)`
        const values = [permission.Role_id, permission.NamePermission]
        connection.query(query, values, callback)
    },
    deletePermission: (Id, callback) => {
        const query = `DELETE FROM role_permission WHERE Role_id = ?`
        connection.query(query, Id, callback)
    }
}
module.exports = PermissionModel