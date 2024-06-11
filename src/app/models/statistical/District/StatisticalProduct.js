const connection = require("../../../../config/db")

const StatisticalProductByDistrictModel = {
    countAllProductByDistrict(DistrictId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(DISTINCT _id) AS CountProduct FROM product WHERE DistrictId ${DistrictId ? `= ${DistrictId}` : "IS NULL"} AND Status = 1 AND IsDeleted = 0`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(results[0].CountProduct)
                }
            })
        })
    },
    countRankOcopThreeStar(DistrictId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(DISTINCT _id) AS CountProduct FROM product WHERE DistrictId ${DistrictId ? `= ${DistrictId}` : "IS NULL"} AND product.RankOcop = 3 AND IsDeleted = 0`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(results[0].CountProduct)
                }
            })
        })
    },
    countRankOcopFourStar(DistrictId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(DISTINCT _id) AS CountProduct FROM product WHERE DistrictId ${DistrictId ? `= ${DistrictId}` : "IS NULL"} AND product.RankOcop = 4 AND IsDeleted = 0`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(results[0].CountProduct)
                }
            })
        })
    },
    countRankOcopFiveStar(DistrictId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(DISTINCT _id) AS CountProduct FROM product WHERE DistrictId ${DistrictId ? `= ${DistrictId}` : "IS NULL"} AND product.RankOcop = 5 AND IsDeleted = 0`
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(results[0].CountProduct)
                }
            })
        })
    },

    // Thong ke theo quan huyen
    countAllProduct() {
        return new Promise((resolve, reject) => {
            const query = `SELECT DistrictId , COUNT(*) AS DistrictName
            FROM product
            `
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(results[0].DistrictName)
                }
            })
        })

    }
}
module.exports = StatisticalProductByDistrictModel