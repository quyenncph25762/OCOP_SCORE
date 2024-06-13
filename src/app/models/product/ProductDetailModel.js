const connection = require("../../../config/db")

const ProductDetailModel = {
    getAllProductDetail: (callback) => {
        const query = `SELECT * FROM product_detail`
        connection.query(query, callback)
    },
    getProductDetailById: (id, callback) => {
        const query = `SELECT * FROM product_detail WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // tim vien dan theo code and productId
    getProductDetailByCode: (Code, productId, callback) => {
        const query = `SELECT * FROM product_detail WHERE Code = ${Code} AND Product_id = ${productId}`
        connection.query(query, callback)
    },
    // get 22 vien dan
    getAllProductDetailLimit: (callback) => {
        const query = `SELECT * FROM product_detail ORDER BY _id LIMIT 22`
        connection.query(query, callback)
    },
    // hien productDetail theo product Id
    getProductDetailByProductId: (id, callback) => {
        const query = `SELECT * FROM product_detail WHERE Product_id = ?`
        connection.query(query, [id], callback)
    },
    // xoa productDetail theo product Id
    deleteProductDetailByProductId: (id, callback) => {
        const query = `DELETE FROM product_detail WHERE Product_id = ?`
        connection.query(query, [id], callback)
    },
    // 
    createProductDetail: (productDetail) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO product_detail (ProductDetail_Name,Code,Product_id) VALUES (?,?,?)`
            const VALUES = [productDetail.ProductDetail_Name, productDetail.Code, productDetail.Product_id]
            if (!connection) {
                return reject(new Error("Database connection is not established"));
            }
            connection.query(query, VALUES, ((err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            }))
        })
    },

}

module.exports = ProductDetailModel