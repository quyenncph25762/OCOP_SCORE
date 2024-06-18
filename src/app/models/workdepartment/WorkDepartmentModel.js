const connection = require("../../../config/db")
const WorkDepartmentModel = {
    // fetch tat ca
    fetchAllWorkDepartment: (DistrictId, callback) => {
        const query = `SELECT * FROM workdepartment 
        WHERE 
        workdepartment.isDeleted = 0 
        AND 
        workdepartment.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`}
        ORDER BY
        workdepartment._id DESC`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllWorkDepartmentFromTrash: (DistrictId, callback) => {
        const query = `SELECT * FROM workdepartment 
        WHERE 
        workdepartment.isDeleted = 1 
        AND 
        workdepartment.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`}`
        connection.query(query, callback)
    },
    // them
    AddWorkDepartment: (workdepartment, callback) => {
        const query = `INSERT INTO workdepartment (title,code,description,DistrictId,creatorUser_id) VALUES (?,?,?,?,?)`
        const values = [workdepartment.title, workdepartment.code, workdepartment.description, workdepartment.DistrictId, workdepartment.creatorUser_id]
        connection.query(query, values, callback)
    },
    // tim kiem vi tri
    findWorkDepartmentAdd: (DistrictId, workdepartment, callback) => {
        const query = `SELECT * FROM 
        workdepartment 
        WHERE 
            workdepartment.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`}
        AND
        title = ?`;
        const values = [workdepartment.title, workdepartment.code];
        connection.query(query, values, callback);
    },
    findWorkDepartmentUpdate: (id, DistrictId, workdepartment, callback) => {
        const query = `SELECT * FROM 
        workdepartment 
        WHERE 
        workdepartment.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`}
        AND
        title = ?  AND _id != ${id}`;
        const values = [workdepartment.title];
        connection.query(query, values, callback);
    },
    // xoa vao thung rac
    deleteWorkDepartmentToTrash: (id, userId, callback) => {
        const query = `UPDATE workdepartment SET isDeleted = 1 , deletedUser_id = ${userId} , deletionTime = CURRENT_TIMESTAMP WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // xoa vao thung rac nhieu
    deleteWorkDepartmentToTrashAll: (id, userId) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE workdepartment SET isDeleted = 1 , deletedUser_id = ${userId} , deletionTime = CURRENT_TIMESTAMP WHERE _id = ${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })

        })
    },
    // xoa
    deleteWorkDepartment: (id, callback) => {
        const query = `DELETE FROM workdepartment WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa nhieu
    deleteWorkDepartmentAll: (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM workdepartment WHERE _id=${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    },
    // khoi phuc
    revertWorkDepartment: (id, callback) => {
        const query = `UPDATE workdepartment SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc nhieu
    revertWorkDepartmentAll: (id) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE workdepartment SET isDeleted = 0 WHERE _id=${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    },
    // lay 1 doi tuong
    getOneWorkDepartment: (id, callback) => {
        const query = `SELECT * FROM workdepartment WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateWorkDepartment: (id, workdepartment, callback) => {
        const query = `UPDATE workdepartment SET  title = ? , code = ?, description = ?  WHERE _id = ?`
        const values = [workdepartment.title, workdepartment.code, workdepartment.description, id]
        connection.query(query, values, callback)
    },
}

module.exports = WorkDepartmentModel