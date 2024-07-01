const connection = require("../../config/db")

const DistrictModel = {
    getAllDistrict: (callback) => {
        const query = `SELECT * FROM district`
        connection.query(query, callback)
    },
    getOneDistrict: (DistrictId) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT d .*,
            p.Name AS province_name
            FROM 
            district AS d
            JOIN
            city AS p ON p._id =  d.City_id
            WHERE d._id = ${DistrictId}`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                }
                return resolve(results)
            })
        })
    },
    getDistrictByProvince: (id, callback) => {
        const query = `SELECT * FROM district WHERE City_id = ${id}`
        connection.query(query, id, callback)
    }
}

module.exports = DistrictModel