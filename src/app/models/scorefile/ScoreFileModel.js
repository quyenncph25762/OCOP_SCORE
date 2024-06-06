const connection = require("../../../config/db")

const ScoreFileModel = {
    // 
    // get scoreFileByScoreCommitee
    getScoreFileByScoreCommittee: (idScoreCommitee, callback) => {
        const query = `
        SELECT 
            scorefile.*,
            product.Name AS product_name,
            product.Avatar AS product_avatar,
            customer.Name AS customer_name,
            productgroup.Name AS productgroup_name,   
            productgroup.Code AS productgroup_code,
            DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate,
            scorecommittee._id AS scorecommitee_id,
            employee.FullName AS employee_FullName,
            workdepartment.title AS workdepartment_title,
            workposition.Name AS workposition_name
        FROM scorefile
        LEFT JOIN 
            product ON product._id = scorefile.Product_id
        LEFT JOIN 
            customer ON customer._id = product.Customer_id
        LEFT JOIN 
            productgroup ON productgroup._id = product.ProductGroup_id
        LEFT JOIN 
            scorecommittee ON scorecommittee._id = scorefile.Scorecommitee_id
        LEFT JOIN 
            employee ON employee._id = scorefile.Employee_id
        LEFT JOIN 
            workdepartment ON workdepartment._id = employee.WorkDepartment_id
        LEFT JOIN 
            workposition ON workposition._id = employee.WorkPosition_id
        WHERE 
            scorefile.IsDeleted = 0 AND scorefile.Status = 2 AND scorefile.Product_id IS NOT NULL AND scorefile.ScoreCommitee_id = ?
         ORDER BY 
        scorefile._id DESC
    `;
        connection.query(query, [idScoreCommitee], callback);
    },

    getScoreFileByEmployee: (id, callback) => {
        const query = `
    SELECT 
        scorefile.*,
        product.Name AS product_name,
        product.Avatar AS product_avatar,
        customer.Name AS customer_name,
        productgroup.Name AS productgroup_name,   
        productgroup.Code AS productgroup_code,
        productgroup._id AS productgroup_id,
        DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate,
        scorecommittee._id AS scorecommitee_id,
        scorecommittee.Employee_id AS scorecommittee_employeeId
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
        scorefile.IsDeleted = 0 AND scorefile.Product_id IS NOT NULL AND scorefile.forEmployeeId = ?
    ORDER BY 
        scorefile._id DESC
`;

        connection.query(query, callback);
    },
    // get all where IsDeleted = 1
    getAllFromTrash: (callback) => {
        const query = `
        SELECT 
            scorefile.*,
            product.Name AS product_name,
            product.Avatar AS product_avatar,
            customer.Name AS customer_name,
            productgroup.Name AS productgroup_name,   
            productgroup.Code AS productgroup_code,
            DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate
        FROM scorefile
        LEFT JOIN product ON product._id = scorefile.Product_id
        LEFT JOIN customer ON customer._id = product.Customer_id
        LEFT JOIN productgroup ON productgroup._id = product.ProductGroup_id
        WHERE scorefile.IsDeleted = 1
    `;
        connection.query(query, callback);
    },
    // get by Status
    getScoreFileByStatus: (callback) => {
        const query = `SELECT * FROM scorefile WHERE Status = 0 AND	IsDeleted = 0`
        connection.query(query, callback)
    },
    getOne: (id, callback) => {
        const query = `
        SELECT 
        scorefile.*,
        product.Name AS product_name,
        product.Avatar AS product_avatar,
        customer.Name AS customer_name,
        productgroup.Name AS productgroup_name,   
        productgroup.Code AS productgroup_code,
        DATE_FORMAT(scorefile.ScoreDate, '%Y-%m-%d') AS formattedScoreDate,
        scorecommittee._id AS scorecommitee_id,
        employee.FullName AS employee_FullName,
        workdepartment.title AS workdepartment_title,
        workposition.Name AS workposition_name
    FROM scorefile
    LEFT JOIN 
        product ON product._id = scorefile.Product_id
    LEFT JOIN 
        customer ON customer._id = product.Customer_id
    LEFT JOIN 
        productgroup ON productgroup._id = product.ProductGroup_id
    LEFT JOIN 
        scorecommittee ON scorecommittee._id = scorefile.Scorecommitee_id
    LEFT JOIN 
        employee ON employee._id = scorefile.Employee_id
    LEFT JOIN 
        workdepartment ON workdepartment._id = employee.WorkDepartment_id
    LEFT JOIN 
        workposition ON workposition._id = employee.WorkPosition_id
    WHERE scorefile.IsDeleted = 0 AND scorefile._id  = ?
`
        connection.query(query, id, callback)
    },
    create: (scoreFile, callback) => {
        const query = `INSERT INTO scorefile (RankOcop,ScoreTotal,ScoreTemp_id,Employee_id,EmployeeUserId,Product_id,Customer_id,ScoreCommitee_id,CreatorUser_id,Note,Name,Code,IsActive,Status,forEmployeeId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const VALUES = [scoreFile.RankOcop, scoreFile.ScoreTotal, scoreFile.ScoreTemp_id, scoreFile.Employee_id, scoreFile.EmployeeUserId, scoreFile.Product_id, scoreFile.Customer_id, scoreFile.ScoreCommitee_id, scoreFile.CreatorUser_id, scoreFile.Note, scoreFile.Name, scoreFile.Code, scoreFile.IsActive, scoreFile.Status, scoreFile.forEmployeeId]
        connection.query(query, VALUES, callback)
    },
    update: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET RankOcop = ? , ScoreTotal = ?,ScoreTemp_id = ?,Employee_id = ?,EmployeeUserId = ?,Product_id = ? , Customer_id = ?,Status = ? , CreatorUser_id = ? , Note = ? , Name = ? , Code = ? , IsActive = ? ,ScoreDate = ? WHERE _id = ?`
        const VALUES = [scoreFile.RankOcop, scoreFile.ScoreTotal, scoreFile.ScoreTemp_id, scoreFile.Employee_id, scoreFile.EmployeeUserId, scoreFile.Product_id, scoreFile.Customer_id, scoreFile.Status, scoreFile.CreatorUser_id, scoreFile.Note, scoreFile.Name, scoreFile.Code, scoreFile.IsActive, scoreFile.ScoreDate, id]
        connection.query(query, VALUES, callback)
    },
    // update hoi dong
    updateScoreCommitteOnScoreFile: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET ScoreCommitee_id = ? WHERE _id = ${id}`
        const VALUES = [scoreFile.ScoreCommitee_id]
        connection.query(query, VALUES, callback)
    },
    // update totalScore
    updateScoreTotal: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET ScoreTotal = ? WHERE _id = ${id}`
        const VALUES = [scoreFile.ScoreTotal]
        connection.query(query, VALUES, callback)
    },
    // update Status = 2
    updateStatus: (id, scoreFile, callback) => {
        const query = `UPDATE scorefile SET Status = ? WHERE _id = ${id}`
        const VALUES = [scoreFile.Status]
        connection.query(query, VALUES, callback)
    },
    // xoa vao thung rac
    removeToTrash: (id, callback) => {
        const query = `UPDATE scorefile SET IsDeleted = 1 WHERE _id = ${id}`
        connection.query(query, callback)
    },
    // Xoa vinh vien
    remove: (id, callback) => {
        const query = `DELETE FROM scorefile WHERE _id = ${id}`
        connection.query(query, callback)
    },
    // Khoi phuc
    revert: (id, callback) => {
        const query = `UPDATE scorefile SET IsDeleted = 0 WHERE _id = ${id}`
        connection.query(query, callback)
    }
}

module.exports = ScoreFileModel