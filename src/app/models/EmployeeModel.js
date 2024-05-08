const connection = require("../../config/db")
const EmployeeModel = {
    // fetch tat ca
    fetchAllEmployee: (callback) => {
        const query = `SELECT employee.*,
        workdepartment.title AS workdepartment_name,
        workposition.title AS workposition_name,
        role.title AS role_name
            FROM
        employee
        JOIN
            workdepartment ON workdepartment._id = employee.workDepartmentId
        JOIN
            workposition ON workposition._id = employee.workPositionId
        JOIN
            role ON role._id = employee.roleId
        WHERE 
        employee.isDeleted = 0;
            
        `
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllEmployeeFromTrash: (callback) => {
        const query = `SELECT * FROM employee WHERE employee.isDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddEmployee: (employee, callback) => {
        const query = `INSERT INTO employee (code,fullName,email,avatar,gender,birthDay,tel,address,workDepartmentId,workPositionId,roleId) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
        const values = [employee.code, employee.fullName, employee.email, employee.avatar, employee.gender, employee.birthDay, employee.tel, employee.address, employee.workDepartmentId, employee.workPositionId, employee.roleId]
        connection.query(query, values, callback)
    },
    // xoa vao thung rac
    deleteEmployeeToTrash: (id, callback) => {
        const query = `UPDATE employee SET isDeleted = 1 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa
    deleteEmployee: (id, callback) => {
        const query = `DELETE FROM employee WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertEmployee: (id, callback) => {
        const query = `UPDATE employee SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneEmployee: (id, callback) => {
        const query = `SELECT * FROM employee WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateEmployee: (id, employee, callback) => {
        const query = `UPDATE employee SET code = ? , fullName = ? , email = ? , avatar = ? , gender = ? , birthDay = ? , tel = ? , address = ? , workDepartmentId = ? , workPositionId = ? , roleId = ?  WHERE _id = ?`
        const values = [employee.code, employee.fullName, employee.email, employee.avatar, employee.gender, employee.birthDay, employee.tel, employee.address, employee.workDepartmentId, employee.workPositionId, employee.roleId, id]
        connection.query(query, values, callback)
    },
}

module.exports = EmployeeModel