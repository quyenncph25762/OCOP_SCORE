const connection = require("../../config/db")

const DistrictModel = {
    getAllDistrict: (callback) => {
        const query = `SELECT * FROM district`
        connection.query(query, callback)
    },
    getDistrictByProvince: (id, callback) => {
        const query = `SELECT * FROM district WHERE City_id = ${id}`
        connection.query(query, id, callback)
    }
}

module.exports = DistrictModel