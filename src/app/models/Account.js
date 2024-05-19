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
    loginAccount: (FullName, Email, Address, Password, callback) => {
        const query = `SELECT 
        employee.*,
        role.title AS role_title
        FROM 
            employee
        JOIN 
        role ON role._id = employee.RoleId
        WHERE FullName = ? OR Email = ? AND Password = ? AND Address = ?
        `
        connection.query(query, [FullName, Email, Password, Address], callback)
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
    }
}

module.exports = AccountModel