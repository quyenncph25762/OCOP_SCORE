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
            const query = `SELECT 
    d._id AS DistrictId,
    d.Name,
    SUM(CASE WHEN p.RankOcop = 1 THEN 1 ELSE 0 END) AS RankOcop_1,
    SUM(CASE WHEN p.RankOcop = 2 THEN 1 ELSE 0 END) AS RankOcop_2,
    SUM(CASE WHEN p.RankOcop = 3 THEN 1 ELSE 0 END) AS RankOcop_3,
    SUM(CASE WHEN p.RankOcop = 4 THEN 1 ELSE 0 END) AS RankOcop_4,
    SUM(CASE WHEN p.RankOcop = 5 THEN 1 ELSE 0 END) AS RankOcop_5
FROM 
    district d
LEFT JOIN 
    product p ON p.DistrictId = d._id
GROUP BY 
    d._id, d.Name;
            `
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    resolve(results.filter((item) => item.DistrictId != null))
                }
            })
        })

    }
}
module.exports = StatisticalProductByDistrictModel