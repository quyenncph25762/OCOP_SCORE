const connection = require('../../../config/db')
const ProductmanageController = {
    getAllProduct: (DistrictId, callback) => {
        const query = `SELECT 
        product.*,
        customer.Name AS customer_name,
        productgroup.Name AS productGroup_name,
        yearreview.yearName AS yearName,
        customer.IsDeleted AS customer_IsDeleted,
        productgroup.IsDeleted AS productgroup_IsDeleted,
        yearreview.isDeleted AS yearreview_IsDeleted
    FROM 
        product
    JOIN 
        customer ON customer._id = product.Customer_id
    JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    JOIN
        yearreview ON yearreview._id = product.ProductYearId
    WHERE 
        product.IsDeleted = 0 AND product.DistrictId = ? ORDER BY product._id DESC;
        `;
        connection.query(query, [DistrictId], callback);

    },
    getAllProductIsNull: (callback) => {
        const query = `SELECT 
        product.*,
        customer.Name AS customer_name,
        productgroup.Name AS productGroup_name,
        yearreview.yearName AS yearName,
        customer.IsDeleted AS customer_IsDeleted,
        productgroup.IsDeleted AS productgroup_IsDeleted,
        yearreview.isDeleted AS yearreview_IsDeleted
    FROM 
        product
    JOIN 
        customer ON customer._id = product.Customer_id
    JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    JOIN
        yearreview ON yearreview._id = product.ProductYearId
    WHERE 
        product.IsDeleted = 0 AND product.DistrictId IS NULL ORDER BY product._id DESC;
        `;
        connection.query(query, callback);

    },

    getProductbyId: (id, callback) => {
        const query = `
    SELECT 
        product.*, 
        customer.Name AS customer_name,
        productgroup.Name AS productGroup_name
    FROM 
        product
    JOIN 
        customer ON customer._id = product.Customer_id
    JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    WHERE product._id = ?`;
        connection.query(query, id, callback);

    },
    addProduct: (product, callback) => {
        const query = 'INSERT INTO product (Name,Code,ProductGroup_id,Customer_id, ProductYearId, Note,Description,RankOcop,Avatar,TotalScore,IsActive,DistrictId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        const values = [product.Name, product.Code, product.ProductGroup_id, product.Customer_id, product.ProductYearId, product.Note, product.Description, product.RankOcop, product.Avatar, product.TotalScore, product.IsActive, product.DistrictId];
        connection.query(query, values, callback);
    },
    findProductAdd: (product, callback) => {
        const query = 'SELECT * FROM product WHERE Name = ? AND DistrictId = ?';
        const values = [product.Name, product.DistrictId];
        connection.query(query, values, callback);
    },
    findProductUpdate: (id, product, callback) => {
        const query = `SELECT * FROM product WHERE Name = ? AND _id != ${id}`;
        const values = [product.Name];
        connection.query(query, values, callback);
    },

    // delete to trash
    deleteToTrashProduct: (product_id, userId, callback) => {
        const query = `UPDATE product SET IsDeleted = 1 , DeleterUser_id = ${userId} , DeletionTime = CURRENT_TIMESTAMP  WHERE _id = ? `;
        connection.query(query, [product_id], callback);
    },
    // khoi phuc
    revertProduct: (product_id, callback) => {
        const query = 'UPDATE product SET IsDeleted = 0 WHERE _id = ?';
        connection.query(query, [product_id], callback);
    },
    // delete forever
    destroyProduct: (id, callback) => {
        const query = `DELETE FROM product WHERE _id = ?`
        connection.query(query, id, callback)
    },
    //getAllTrash
    getAllProductFromtTrash: (DistrictId, callback) => {
        const query = `SELECT 
        product.*,
        customer.Name AS customer_name,
        productgroup.Name AS productGroup_name,
        yearreview.yearName AS yearName,
        customer.IsDeleted AS customer_IsDeleted,
        productgroup.IsDeleted AS productgroup_IsDeleted,
        yearreview.isDeleted AS yearreview_IsDeleted
    FROM 
        product
    JOIN 
        customer ON customer._id = product.Customer_id
    JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    JOIN
        yearreview ON yearreview._id = product.ProductYearId
    WHERE 
        product.DistrictId = ${DistrictId} AND product.IsDeleted = 1;
        `
        connection.query(query, callback)
    },
    getAllProductFromtTrashIsNull: (callback) => {
        const query = `SELECT 
        product.*,
        customer.Name AS customer_name,
        productgroup.Name AS productGroup_name,
        yearreview.yearName AS yearName,
        customer.IsDeleted AS customer_IsDeleted,
        productgroup.IsDeleted AS productgroup_IsDeleted,
        yearreview.isDeleted AS yearreview_IsDeleted
    FROM 
        product
    JOIN 
        customer ON customer._id = product.Customer_id
    JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    JOIN
        yearreview ON yearreview._id = product.ProductYearId
    WHERE 
        product.DistrictId IS NULL AND product.IsDeleted = 1;
        `
        connection.query(query, callback)
    },

    // updateProduct
    updateProduct: (id, product, callback) => {
        const query = 'UPDATE product SET Name = ?,Code = ?, ProductGroup_id = ? , Customer_id = ?, ProductYearId = ?, Note = ? , Description = ? ,  Avatar = ? ,  IsActive = ?  WHERE _id = ?';
        const values = [product.Name, product.Code, product.ProductGroup_id, product.Customer_id, product.ProductYearId, product.Note, product.Description, product.Avatar, product.IsActive, id];
        connection.query(query, values, callback);
    },
    // update Status Product
    updateStatusProduct: (id, product, callback) => {
        const query = 'UPDATE product SET Status = ?  WHERE _id = ?';
        const values = [product.Status, id];
        connection.query(query, values, callback);
    },
    // updateRankOcopProuct
    updateRankOcopProduct: (id, product, callback) => {
        const query = 'UPDATE product SET RankOcop = ? , TotalScore = ?  WHERE _id = ?';
        const values = [product.RankOcop, product.ScoreTotal, id];
        connection.query(query, values, callback);
    }

}
module.exports = ProductmanageController;