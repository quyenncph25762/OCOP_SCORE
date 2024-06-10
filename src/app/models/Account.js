const connection = require("../../config/db")

const AccountModel = {
    fetchAlluser: (callBack) => {
        const query = `SELECT employee.*,
        role.title as role_title,
        role.status as role_status
        work
        FROM employee
        JOIN 
        role ON role._id = employee.RoleId
        WHERE IsDeleted = 0`
        connection.query(query, callBack)
    },
    // login
    loginAccount: (UserName, Password, District, callback) => {
        const query = `SELECT 
        employee.*,
        role.title AS role_title
        FROM 
            employee
        JOIN 
        role ON role._id = employee.RoleId
        WHERE UserName = ? AND Password = ? AND DistrictId = ?
        `
        connection.query(query, [UserName, Password, District], callback)
    },
    // login admin
    loginAccountAdmin: (UserName, Password, callback) => {
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
    // tim ten user xem da ton tai chua
    findUserAdd: (employee, callback) => {
        const query = `SELECT * FROM employee WHERE FullName = ?`;
        const values = [employee.FullName];
        connection.query(query, values, callback);
    },
    // tim ten user xem da ton tai chua
    findUserUpdate: (id, employee, callback) => {
        const query = `SELECT * FROM employee WHERE UserName = ? AND _id != ${id}`;
        const values = [employee.UserName];
        connection.query(query, values, callback);
    },
    // Them nguoi dung
    AddUser: (employee, callback) => {
        const query = `INSERT INTO employee (Code,FullName,UserName,Email,Avatar,Phone,RoleId,CreatorUser_id,IsActive,Password) VALUES (?,?,?,?,?,?,?,?,?)`
        const values = [employee.Code, employee.FullName, employee.UserName, employee.Email, employee.Avatar, employee.Phone, employee.RoleId, employee.CreatorUser_id, employee.IsActive, employee.Password]
        connection.query(query, values, callback)
    },
    // update nguoi dung
    updateUser: (id, employee, callback) => {
        const query = `UPDATE employee SET FullName = ? , UserName = ? , Email = ? , Phone = ? , RoleId = ? , Password = ?,  IsActive = ? WHERE _id = ${id}`
        console.log(query)
        const values = [employee.FullName, employee.UserName, employee.Email, employee.Phone, employee.RoleId, employee.Password, employee.IsActive]
        connection.query(query, values, callback)
    },
    // lock User
    lockUser: (id, user, callback) => {
        const query = `UPDATE employee SET isLock = ? WHERE _id = ${id}`
        const VALUES = [user.isLock]
        connection.query(query, VALUES, callback)
    }
}

module.exports = AccountModel