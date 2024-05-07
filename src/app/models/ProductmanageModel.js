const connection = require('../../config/db')
const ProductmanageController = {
    getAllProduct: (callback) => {
        const query = `SELECT 
        product.*,
        customer.customer_name AS customer_name,
        productgroup.productGroup_name AS productGroup_name,
        yearreview.yearName AS yearName
    FROM 
        product
    JOIN 
        customer ON customer._id = product.customer_id
    JOIN 
        productgroup ON productgroup._id = product.productGroup_id
    JOIN
        yearreview ON yearreview._id = product.productYearId
    WHERE 
        product.is_deleted = 0;
        `;
        connection.query(query, callback);

    },
    getProductbyId: (callback) => {
        const query = 'SELECT * FROM product WHERE product_id = ?';
        connection.query(query, callback);
    },
    addProduct: (product, callback) => {
        const query = 'INSERT INTO product (product_name,product_code,productGroup_id,customer_id, productYearId, product_note,description) VALUES (?,?,?,?,?,?,?)';
        const values = [product.product_name, product.product_code, product.productGroup_id, product.customer_id, product.productYearId, product.product_note, product.description];
        connection.query(query, values, callback);
    },
    findProduct: (product_name, product_code, product_group, productYearId, product_note, customer_id, description, callback) => {
        const query = 'SELECT * FROM product WHERE product_name = ? AND product_code = ? AND productGroup_id = ? AND productYearId = ? AND product_note = ? AND customer_id = ? AND description = ?';
        const values = [product_name, product_code, product_group, productYearId, product_note, , customer_id, description];
        connection.query(query, values, callback);
    },
    updateProduct: (id, product, callback) => {
        const query = 'UPDATE product SET product_name = ?,product_code = ?, productGroup_id = ?,customer_id = ?, productYearId = ?, product_note = ? , description = ? WHERE _id = ?';
        const values = [product.product_name, product.product_code, product.productGroup_id, product.customer_id, product.productYearId, product.product_note, product.description, id];
        connection.query(query, values, callback);
    },
    // delete to trash
    deleteToTrashProduct: (product_id, callback) => {
        const query = 'UPDATE product SET is_deleted = 1 WHERE _id = ?';
        connection.query(query, [product_id], callback);
    },
    // khoi phuc
    revertProduct: (product_id, callback) => {
        const query = 'UPDATE product SET is_deleted = 0 WHERE _id = ?';
        connection.query(query, [product_id], callback);
    },
    // delete forever
    destroyProduct: (id, callback) => {
        const query = `DELETE FROM product WHERE _id = ?`
        connection.query(query, id, callback)
    },
    //getAllTrash
    getAllProductFromtTrash: (callback) => {
        const query = `SELECT 
        product.*,
        customer.customer_name AS customer_name,
        productgroup.productGroup_name AS productGroup_name
    FROM 
        product
    JOIN 
        customer ON customer._id = product.customer_id
    JOIN 
        productgroup ON productgroup._id = product.productGroup_id
    WHERE 
        product.is_deleted = 1;
        `
        connection.query(query, callback)
    },

}
module.exports = ProductmanageController;