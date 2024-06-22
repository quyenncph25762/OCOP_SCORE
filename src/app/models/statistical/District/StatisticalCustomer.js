const connection = require("../../../../config/db")

const StatisticalCustomerModel = {
    quantityCustomer(DistrictId) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT COUNT(DISTINCT _id) AS CountCustomer FROM customer WHERE customer.District_id ${DistrictId ? `= ${DistrictId}` : `IS NULL`}
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