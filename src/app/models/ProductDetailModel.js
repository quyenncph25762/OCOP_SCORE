const connection = require("../../config/db")

const ProductDetailModel = {
    getAllProductDetail: (callback) => {
        const query = `SELECT * FROM product_detail`
        connection.query(query, callback)
    },
    getProductDetailById: (id, callback) => {
        const query = `SELECT * FROM product_detail WHERE _id = ?`
        connection.query(query, id, callback)
    },
    getAllProductDetailLimit: (callback) => {
        const query = `SELECT * FROM product_detail ORDER BY _id LIMIT 22`
        connection.query(query, callback)
    },
    getProductDetailByProductId: (id, callback) => {
        const query = `SELECT * FROM product_detail WHERE Product_id = ?`
        connection.query(query, id, callback)
    },
    createProductDetail: (productDetail, callback) => {
        const query = `INSERT INTO product_detail (ProductDetail_Name,Product_id) VALUES (?,?)`
        const VALUES = [productDetail.ProductDetail_Name, productDetail.Product_id]
        connection.query(query, VALUES, callback)
    }
}

module.exports = ProductDetailModel