const connection = require("../../config/db")

const WardModel = {
    getAllWard: (callback) => {
        const query = `SELECT * FROM ward`
        connection.query(query, callback)
    },
    getWardByDistrict: (id, callback) => {
        const query = `SELECT * FROM ward WHERE District_id = ${id}`
        connection.query(query, id, callback)
    }
}

module.exports = WardModel