const connection = require("../../config/db")

const ProvinceModel = {
    getAllProvince: (callback) => {
        const query = `SELECT * FROM city`
        connection.query(query, callback)
    }
}

module.exports = ProvinceModel