const connection = require('../../config/db')
const CustomerManageController = {
    getAllCustomer: (callback) => {
        const query = 'SELECT * FROM customer WHERE is_deleted = 0';
        connection.query(query, callback);
    },
    getCustomerbyId: (callback) => {
        const query = 'SELECT customer_name, customer_phone, customer_address * FROM customer WHERE customer_id=?';
        connection.query(query, callback);
    },
    addCustomer: (customer, callback) => {
        const query = 'INSERT INTO customer (customer_name,customer_otherName,customer_email, customer_phone, customer_address) VALUES (?,?,?,?,?)';
        const values = [customer.customer_name, customer.customer_otherName, customer.customer_email, customer.customer_phone, customer.customer_address];
        connection.query(query, values, callback);
    },
    findCustomer: (customer_name, customer_phone, customer_address, customer_otherName, customer_email, callback) => {
        const query = 'SELECT * FROM customer WHERE customer_name = ? AND customer_phone = ? AND customer_address = ? AND customer_otherName = ? AND customer_email = ? ';
        const values = [customer_name, customer_phone, customer_address, customer_otherName, customer_email];
        connection.query(query, values, callback);
    },
    updateCustomer: (_id, customer, callback) => {
        const query = 'UPDATE customer SET customer_name = ?,customer_otherName = ?,customer_email = ? , customer_phone = ?, customer_address = ? WHERE _id = ?';
        const values = [customer.customer_name, customer.customer_otherName, customer.customer_email, customer.customer_phone, customer.customer_address, _id];
        connection.query(query, values, callback);
    },
    deleteCustomer: (customer_id, callback) => {
        const query = 'UPDATE customer SET is_deleted = 1 WHERE _id = ?';
        connection.query(query, [customer_id], callback);
    },
    // trash
    getAllCustomerFromTrash: (callback) => {
        const query = 'SELECT * FROM customer WHERE is_deleted = 1';
        connection.query(query, callback);
    },
    remove: (id, callback) => {
        const query = 'DELETE FROM customer WHERE _id = ?';
        connection.query(query, id, callback);
    },
    revert: (id, callback) => {
        const query = `UPDATE customer SET is_deleted = 0 WHERE _id = ${id}`
        connection.query(query, id, callback)
    }
}
module.exports = CustomerManageController;