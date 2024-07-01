const connection = require("../../../config/db");

const ScoreFileProvinceModel = {
    getScoreFileByEmployee: (id, callback) => {
        const query = `
    SELECT 
        scorefile.*,
        product.Name AS product_name,
        product.RankOcop AS product_RankOcop,
        product.Avatar AS product_avatar,
        customer.Name AS customer_name,
        productgroup.Name AS productgroup_name,   
        productgroup.Code AS productgroup_code,
        productgroup._id AS productgroup_id,
        DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate,
        scorecommittee._id AS scorecommitee_id,
        scorecommittee.Employee_id AS scorecommittee_employeeId,
        scorecommittee.Name AS scorecommittee_name,
        scorecommittee.IsActive AS scorecommittee_active
    FROM 
        scorefile
    LEFT JOIN 
        product ON product._id = scorefile.Product_id
    LEFT JOIN 
        customer ON customer._id = product.Customer_id
    LEFT JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    LEFT JOIN 
        scorecommittee ON scorecommittee._id = scorefile.Scorecommitee_id
    WHERE 
        scorefile.IsDeleted = 0 AND scorefile.Product_id IS NOT NULL AND product.IsProvince = 1 AND scorefile.forEmployeeId = ?
    ORDER BY 
        scorefile._id DESC
`;

        connection.query(query, [id], callback);
    },
}

module.exports = ScoreFileProvinceModel