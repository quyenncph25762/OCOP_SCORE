const connection = require("../../../config/db")
const ProductGroupModel = {
    // fetch tat ca
    fetchAllProductGroup: (callback) => {
        const query = `SELECT * FROM productgroup WHERE productgroup.IsDeleted = 0 ORDER BY productgroup._id DESC`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllProductFromTrash: (callback) => {
        const query = `SELECT * FROM productgroup WHERE productgroup.IsDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddProductGroup: (productGroup, callback) => {
        const query = `INSERT INTO productgroup (Name,Code,IsActive,Note) VALUES (?,?,?,?)`
        const values = [productGroup.Name, productGroup.Code, productGroup.IsActive, productGroup.Note]
        connection.query(query, values, callback)
    },
    // findProductGroup
    findProductGroupUpdate: (id, productGroup, callback) => {
        const query = `SELECT * FROM productgroup WHERE Name = ? AND _id !=${id}`;
        const values = [productGroup.Name];
        connection.query(query, values, callback);
    },
    findProductGroupAdd: (productGroup, callback) => {
        const query = `SELECT * FROM productgroup WHERE Name = ?`;
        const values = [productGroup.Name];
        connection.query(query, values, callback);
    },
    // xoa vao thung rac
    deleteProductGroupToTrash: (id, userId, callback) => {
        const query = `UPDATE productgroup SET IsDeleted = 1 , DeletedUser_id=${userId} , DeletionTime = CURRENT_TIMESTAMP WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // xoa vao thung rac nhieu
    deleteProductGroupToTrashAll: (id, userId) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE productgroup SET IsDeleted = 1 , DeletedUser_id=${userId} , DeletionTime = CURRENT_TIMESTAMP WHERE _id = ${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    },
    // xoa
    deleteProductGroup: (id, callback) => {
        const query = `DELETE FROM productgroup WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa nhieu
    deleteProductGroupAll: (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM productgroup WHERE _id=${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    },
    // khoi phuc
    revertProductGroup: (id, callback) => {
        const query = `UPDATE productgroup SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc nhieu
    revertProductGroupAll: (id) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE productgroup SET isDeleted = 0 WHERE _id=${id}`
            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    },
    // lay 1 doi tuong
    getOneProductGroup: (id, callback) => {
        const query = `SELECT * FROM productgroup WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateProductGroup: (id, productGroup, callback) => {
        const query = `UPDATE productgroup SET Name = ? , Code = ? , IsActive = ? , Note = ? WHERE _id=${id}`
        const values = [productGroup.Name, productGroup.Code, productGroup.IsActive, productGroup.Note]
        connection.query(query, values, callback)
    },
}

module.exports = ProductGroupModel