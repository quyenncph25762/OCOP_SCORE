const connection = require("../../../config/db")

const WorkPositionModel = {
    // fetch tat ca
    fetchAllWorkPosition: (DistrictId, callback) => {
        const query = `SELECT * FROM workposition 
        WHERE 
            workposition.IsDeleted = 0 AND workposition.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`}
        ORDER BY 
            workposition._id DESC`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllWorkPositionFromTrash: (DistrictId, callback) => {
        const query = `SELECT * FROM workposition 
        WHERE 
        workposition.IsDeleted = 1 AND workposition.DistrictId  ${DistrictId ? `= ${DistrictId}` : `IS NULL`}`
        connection.query(query, callback)
    },
    // them
    AddWorkPosition: (workPosition, callback) => {
        const query = `INSERT INTO workposition (Name,Code,IsManager,IsActive,Note,CreatorUser_id,DistrictId) VALUES (?,?,?,?,?,?,?)`
        const values = [workPosition.Name, workPosition.Code, workPosition.IsManager, workPosition.IsActive, workPosition.Note, workPosition.CreatorUser_id, workPosition.DistrictId]
        connection.query(query, values, callback)
    },
    // tim kiem vi tri
    findWorkPositionAdd: (DistrictId, workPosition, callback) => {
        const query = `SELECT * FROM workposition WHERE workposition.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`} AND Name = ? `;
        const values = [workPosition.Name];
        connection.query(query, values, callback);
    },
    findWorkPositionUpdate: (id, DistrictId, workPosition, callback) => {
        const query = `SELECT * FROM workposition WHERE workposition.DistrictId ${DistrictId ? `= ${DistrictId}` : `IS NULL`} AND Name = ? AND _id != ${id}`;
        const values = [workPosition.Name];
        connection.query(query, values, callback);
    },
    // xoa vao thung rac
    deleteWorkPositionToTrash: (id, userId, callback) => {
        const query = `UPDATE workposition SET IsDeleted = 1 , DeletedUser_id = ${userId} , deletionTime = CURRENT_TIMESTAMP WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // xoa vao thung rac nhieu
    deleteWorkPositionToTrashAll: (id, userId) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE workposition SET IsDeleted = 1 , DeletedUser_id = ${userId} , deletionTime = CURRENT_TIMESTAMP WHERE _id = ${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })

        })
    },
    // xoa
    deleteWorkPosition: (id, callback) => {
        const query = `DELETE FROM workposition WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa nhieu
    deleteWorkPositionAll: (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM workposition WHERE _id=${id}`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                }
                return resolve(results)
            })

        })
    },
    // khoi phuc
    revertWorkPosition: (id, callback) => {
        const query = `UPDATE workposition SET IsDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc nhieu
    revertWorkPositionAll: (id) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE workposition SET IsDeleted = 0 WHERE _id=${id}`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                }
                return resolve(results)
            })
        })

    },
    // lay 1 doi tuong
    getOneWorkPosition: (id, callback) => {
        const query = `SELECT * FROM workposition WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateWorkPosition: (id, workPosition, callback) => {
        const query = `UPDATE workposition SET Name = ? , Code = ? , IsManager = ?, IsActive = ? , Note = ?  WHERE _id=${id}`
        const values = [workPosition.Name, workPosition.Code, workPosition.IsManager, workPosition.IsActive, workPosition.Note, id]
        connection.query(query, values, callback)
    },
}

module.exports = WorkPositionModel