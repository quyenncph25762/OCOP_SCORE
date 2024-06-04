const connection = require("../../config/db")

const AccountModel = {
    fetchAlluser: (callBack) => {
        const query = `SELECT employee.*,
        role.title as role_title,
        FROM employee
        JOIN 
        role ON role._id = employee.RoleId
        WHERE IsDeleted = 0`
        connection.query(query, callBack)
    },
    // login
    loginAccount: (UserName, Password, callback) => {
        const query = `SELECT 
        employee.*,
        role.title AS role_title
        FROM 
            employee
        JOIN 
        role ON role._id = employee.RoleId
        WHERE UserName = ? AND Password = ?
        `
        connection.query(query, [UserName, Password], callback)
    },
    //getOneUser
    fetchOneUser: (id, callback) => {
        const query = `
    SELECT 
        employee.*,
        role.title as role_title
    FROM 
        employee
    JOIN 
        role ON role._id = employee.RoleId
    WHERE 
        employee._id = ?`
        connection.query(query, id, callback)
    },
    // tim user theo id va password
    findUserById: (id, password, callback) => {
        const query = `SELECT * FROM employee WHERE Password = '${password}' AND _id = ${id}`
        connection.query(query, callback)
    },
    // changePassword
    changePasswordByUserId: (id, password, callback) => {
        const query = `UPDATE employee SET Password = ? WHERE _id = ?`
        connection.query(query, [password, id], callback)
    },
    // changePassword by email
    changePasswordByEmail: (Email, password, callback) => {
        const query = `UPDATE employee SET Password = ? WHERE Email = ?`
        connection.query(query, [password, Email], callback)
    },
}

module.exports = AccountModel