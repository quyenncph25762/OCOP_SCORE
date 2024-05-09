const connection = require("../../config/db")
const ProductGroupModel = {
    // fetch tat ca
    fetchAllProductGroup: (callback) => {
        const query = `SELECT * FROM productgroup WHERE productgroup.isDeleted = 0`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllProductFromTrash: (callback) => {
        const query = `SELECT * FROM productgroup WHERE productgroup.isDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddProductGroup: (productGroup, callback) => {
        const query = `INSERT INTO productgroup (productGroup_name,code,status,note) VALUES (?,?,?,?)`
        const values = [productGroup.productGroup_name, productGroup.code, productGroup.status, productGroup.note]
        connection.query(query, values, callback)
    },
    // xoa vao thung rac
    deleteProductGroupToTrash: (id, callback) => {
        const query = `UPDATE productgroup SET isDeleted = 1 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // xoa
    deleteProductGroup: (id, callback) => {
        const query = `DELETE FROM productgroup WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertProductGroup: (id, callback) => {
        const query = `UPDATE productgroup SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneProductGroup: (id, callback) => {
        const query = `SELECT * FROM productgroup WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateProductGroup: (id, productGroup, callback) => {
        const query = `UPDATE productgroup SET code = ? , productGroup_name = ? , status = ? , note = ? WHERE _id=${id}`
        const values = [productGroup.code, productGroup.productGroup_name, productGroup.status, productGroup.note]
        connection.query(query, values, callback)
    },
}

module.exports = ProductGroupModel