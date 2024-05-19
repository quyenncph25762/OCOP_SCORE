const connection = require('../../config/db')
const CustomerManageController = {
    getAllCustomer: (callback) => {
        const query = `SELECT customer.*, 
        city.Name AS city_name, 
        district.Name AS district_name, 
        ward.Name AS ward_name 
 FROM customer 
 JOIN city ON city._id = customer.City_id 
 JOIN district ON district._id = customer.District_id 
 JOIN ward ON ward._id = customer.Ward_id 
 WHERE Isdeleted = 0;
        `;
        // const query = 'SELECT * FROM customer WHERE Isdeleted = 0';
        connection.query(query, callback)
    },
    getCustomerbyId: (callback) => {
        const query = 'SELECT Name, Phone, Address * FROM customer WHERE _id=?';
        connection.query(query, callback);
    },
    addCustomer: (customer, callback) => {
        const query = 'INSERT INTO customer (Name,SubName,Email, Phone, Address,Code,City_id,District_id,Ward_id ) VALUES (?,?,?,?,?,?,?,?,?)';
        const values = [customer.Name, customer.SubName, customer.Email, customer.Phone, customer.Address, customer.Code, customer.City_id, customer.District_id, customer.Ward_id];
        connection.query(query, values, callback);
    },
    // update
    updateCustomer: (_id, customer, callback) => {
        const query = 'UPDATE customer SET Name = ?,SubName = ?,Email = ? , Phone = ?, Address = ? , Code = ? , City_id = ? , District_id = ? , Ward_id = ? WHERE _id = ?';
        const values = [customer.Name, customer.SubName, customer.Email, customer.Phone, customer.Address, customer.Code, customer.City_id, customer.District_id, customer.Ward_id, _id];
        connection.query(query, values, callback);
    },
    // tim khach hang
    findCustomerAdd: (Customer, callback) => {
        const query = 'SELECT * FROM customer WHERE Name = ? OR Phone = ?  OR SubName = ? OR Email = ? ';
        const values = [Customer.Name, Customer.Phone, Customer.SubName, Customer.Email];
        connection.query(query, values, callback);
    },
    findCustomerUpdate: (id, Customer, callback) => {
        const query = `SELECT * FROM customer WHERE (Name = ? OR Phone = ? OR SubName = ? OR Email = ?) AND _id != ${id} `;
        const values = [Customer.Name, Customer.Phone, Customer.SubName, Customer.Email];
        connection.query(query, values, callback);
    },

    // xoa customer to trash
    deleteCustomer: (customer_id, UserId, callback) => {
        const query = `UPDATE customer SET IsDeleted = 1 , DeleterUser_id = ${UserId} ,DeletionTime = CURRENT_TIMESTAMP  WHERE _id = ?`;
        connection.query(query, customer_id, callback);
    },
    // trash
    getAllCustomerFromTrash: (callback) => {
        const query = `SELECT customer.*, 
        city.Name AS city_name, 
        district.Name AS district_name, 
        ward.Name AS ward_name 
 FROM customer 
 JOIN city ON city._id = customer.City_id 
 JOIN district ON district._id = customer.District_id 
 JOIN ward ON ward._id = customer.Ward_id 
 WHERE Isdeleted = 1;
        `;
        connection.query(query, callback);
    },
    remove: (id, callback) => {
        const query = 'DELETE FROM customer WHERE _id = ?';
        connection.query(query, id, callback);
    },
    revert: (id, callback) => {
        const query = `UPDATE customer SET IsDeleted = 0 WHERE _id = ${id}`
        connection.query(query, id, callback)
    }
}
module.exports = CustomerManageController;