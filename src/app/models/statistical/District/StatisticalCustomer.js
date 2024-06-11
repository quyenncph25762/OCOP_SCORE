const connection = require("../../../../config/db")

const StatisticalCustomerModel = {
    quantityCustomer() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT COUNT(DISTINCT _id) AS CountCustomer FROM customer
            `
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0].CountCustomer);
            });
        });
    }
}

module.exports = StatisticalCustomerModel