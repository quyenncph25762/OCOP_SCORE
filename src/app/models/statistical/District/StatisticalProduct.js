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

    // Thong ke san pham theo quan huyen
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

    },
    // Bieu do ty le san pham ocop theo vùng
    // COALESCE: khi giá tri = null thì có thể cài bằng 1 giá trị mặc định khác 
    getProductOcopByDistrict() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    d._id AS DistrictId,
                    d.Name AS DistrictName,
                    COALESCE(COUNT(p._id), 0) AS ProductOcop,
                    COALESCE(total.TotalCount, 0) AS TotalProduct
                FROM 
                    district d
                LEFT JOIN 
                    product p ON p.DistrictId = d._id AND p.RankOcop >= 3
                LEFT JOIN (
                    SELECT 
                        DistrictId, 
                        COUNT(_id) AS TotalCount
                    FROM 
                        product p_all
                    WHERE
                        p_all.RankOcop > 0
                    GROUP BY 
                        DistrictId
                ) total ON total.DistrictId = d._id 
                GROUP BY 
                    d._id, d.Name, total.TotalCount
            `;

            connection.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
}
module.exports = StatisticalProductByDistrictModel