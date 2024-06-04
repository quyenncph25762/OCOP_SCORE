const connection = require("../../../config/db")
const EmployeeModel = {
    // fetch tat ca
    fetchAllEmployee: (callback) => {
        const query = `SELECT employee.*,
        workdepartment.title AS workdepartment_name,
        workposition.Name AS workposition_name,
        role.title AS role_name,
        workdepartment.isDeleted AS workdepartment_IsDeleted,
        workposition.IsDeleted AS workposition_IsDeleted,
        DATE_FORMAT(employee.DoB, '%Y-%m-%d') AS formattedDoB
            FROM
        employee
        JOIN
            workdepartment ON workdepartment._id = employee.WorkDepartment_id
        JOIN
            workposition ON workposition._id = employee.WorkPosition_id
        JOIN
            role ON role._id = employee.RoleId
        WHERE employee.IsDeleted = 0 ORDER BY employee._id DESC;
        `
        connection.query(query, callback)
    },
    fetchAllUser: (callback) => {
        const query = `SELECT employee.*,
        role.title AS role_name
        FROM
            employee
        JOIN
            role ON role._id = employee.RoleId
        WHERE employee.IsDeleted = 0 ORDER BY employee._id DESC;
        `
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllEmployeeFromTrash: (callback) => {
        const query = `SELECT employee.*,
        workdepartment.title AS workdepartment_name,
        workposition.Name AS workposition_name,
        role.title AS role_name,
        workdepartment.isDeleted AS workdepartment_IsDeleted,
        workposition.IsDeleted AS workposition_IsDeleted
            FROM
        employee
        LEFT JOIN
            workdepartment ON workdepartment._id = employee.WorkDepartment_id
        LEFT JOIN
            workposition ON workposition._id = employee.WorkPosition_id
        LEFT JOIN
            role ON role._id = employee.RoleId
        WHERE employee.IsDeleted = 1;
        `
        connection.query(query, callback)
    },
    // them
    AddEmployee: (employee, callback) => {
        const query = `INSERT INTO employee (Code,FullName,UserName,Email,Avatar,Gender,DoB,Phone,Address,WorkDepartment_id,WorkPosition_id,roleId,CreatorUser_id,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const values = [employee.Code, employee.FullName, employee.UserName, employee.Email, employee.Avatar, employee.Gender, employee.DoB, employee.Phone, employee.Address, employee.WorkDepartment_id, employee.WorkPosition_id, employee.roleId, employee.CreatorUser_id, employee.Password]
        connection.query(query, values, callback)
    },
    // tim can bo
    findEmployeeUpdate: (id, employee, callback) => {
        const query = `SELECT * FROM employee WHERE FullName = ? AND _id != ${id}`;
        const values = [employee.FullName, id];
        connection.query(query, values, callback);
    },
    findEmployeeAdd: (employee, callback) => {
        const query = `SELECT * FROM employee WHERE FullName = ?`;
        const values = [employee.FullName];
        connection.query(query, values, callback);
    },
    // xoa vao thung rac
    deleteEmployeeToTrash: (id, userId, callback) => {
        const query = `UPDATE employee SET IsDeleted = 1 , DeletedUser_id = ${userId} , DeletionTime = CURRENT_TIMESTAMP  WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // xoa
    deleteEmployee: (id, callback) => {
        const query = `DELETE FROM employee WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertEmployee: (id, callback) => {
        const query = `UPDATE employee SET IsDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneEmployee: (id, callback) => {
        const query = `SELECT * FROM employee WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateEmployee: (id, employee, callback) => {
        const query = `UPDATE employee SET Code = ? , FullName = ? , Email = ? , Avatar = ? , Gender = ? , DoB = ? , Phone = ? , Address = ? , WorkDepartment_id = ? , WorkPosition_id = ? , roleId = ?  WHERE _id = ?`
        const values = [employee.Code, employee.FullName, employee.Email, employee.Avatar, employee.Gender, employee.DoB, employee.Phone, employee.Address, employee.WorkDepartment_id, employee.WorkPosition_id, employee.roleId, id]
        connection.query(query, values, callback)
    },
    // findByEmail
    findEmployeeByEmail: (employee, callBack) => {
        const query = `SELECT * FROM employee WHERE Email = ?`
        const VALUES = [employee.Email]
        connection.query(query, VALUES, callBack)
    }

}

module.exports = EmployeeModel