const connection = require("../../config/db")

const AccountModel = {
    fetchAllUser: (callBack) => {
        const query = `
        SELECT employee.*,
        role.title AS role_name,
        DATE_FORMAT(employee.DoB, '%Y-%m-%d') AS formattedDoB
            FROM
        employee
        JOIN
            role ON role._id = employee.RoleId
        WHERE employee.IsDeleted = 0 AND employee.WorkDepartment_id IS NULL AND employee.WorkPosition_id IS NULL ORDER BY employee._id DESC;
        `
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
        WHERE  UserName = ? AND Password = ? AND DistrictId ${District ? `= ${District}` : "IS NULL"}
        `
        connection.query(query, [UserName, Password, District], callback)
    },
    // fetchAllAdmin

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
    changePasswordByEmail: (email, password, callback) => {
        const query = `UPDATE employee SET Password = ? WHERE email = ?`
        connection.query(query, [password, email], callback)
    },
    // find user by email
    findUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM employee WHERE Email = ${email}`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                }
                return resolve(results)
            })

        })
    },
    // tim ten user xem da ton tai chua
    findUserAdd: (employee, callback) => {
        const query = `SELECT * FROM employee WHERE FullName = ?`;
        const values = [employee.FullName];
        connection.query(query, values, callback);
    },
    // tim ten user xem da ton tai chua
    findUserUpdate: (id, DistrictId, employee, callback) => {
        const query = `SELECT * FROM employee 
            WHERE 
        UserName = ? AND _id != ${id} AND DistrictId ${DistrictId ? `= ${DistrictId}` : "IS NULL"}`
        const values = [employee.UserName]
        connection.query(query, values, callback);
    },
    // Them nguoi dung
    AddUser: (employee, callback) => {
        const query = `INSERT INTO employee (Code,FullName,UserName,Email,Avatar,Phone,RoleId,CreatorUser_id,IsActive,Password,DistrictId) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
        const values = [employee.Code, employee.FullName, employee.UserName, employee.Email, employee.Avatar, employee.Phone, employee.RoleId, employee.CreatorUser_id, employee.IsActive, employee.Password, employee.DistrictId]
        connection.query(query, values, callback)
    },
    // update nguoi dung
    updateUser: (id, employee, callback) => {
        const query = `UPDATE employee SET FullName = ? , UserName = ? , Email = ? , Phone = ? , RoleId = ? , Password = ?,  IsActive = ? , DistrictId = ? WHERE _id = ${id}`
        console.log(query)
        const values = [employee.FullName, employee.UserName, employee.Email, employee.Phone, employee.RoleId, employee.Password, employee.IsActive, employee.DistrictId]
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