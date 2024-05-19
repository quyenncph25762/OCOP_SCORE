const connection = require("../../config/db")

const WardModel = {
    getAllWard: (callback) => {
        const query = `SELECT * FROM ward`
        connection.query(query, callback)
    },
    getWardByProvince: (id, callback) => {
        const query = `SELECT * FROM ward where District_id = ?`
        connection.query(query, id, callback)
    }
}

module.exports = WardModel