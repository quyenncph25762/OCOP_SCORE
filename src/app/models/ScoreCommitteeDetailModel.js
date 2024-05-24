const connection = require("../../config/db")

const ScoreCommitteeDetailModel = {
    getByScoreCommittee: (id, callback) => {
        const query = `
        SELECT 
            scorecommittee_detail.*,
            user_employee.FullName AS employee_FullName,
            user_employee.Email AS employee_Email,
            sec_employee.FullName AS secUser_FullName
        FROM
            scorecommittee_detail
        LEFT JOIN
            employee AS user_employee ON user_employee._id = scorecommittee_detail.UserId
        LEFT JOIN
            employee AS sec_employee ON sec_employee._id = scorecommittee_detail.SecUserId
        WHERE 
            scorecommittee_detail.IsDeleted = 0 
            AND scorecommittee_detail.ScoreCommittee_id = ?
        `;
        connection.query(query, [id], callback)
    },
    create: (data, callback) => {
        const query = `INSERT INTO scorecommittee_detail (ScoreCommittee_id,Employee_id,SecEmployee_id,UserId,SecUserId,CommitteeRole) VALUES (?,?,?,?,?,?)`
        const VALUES = [data.ScoreCommittee_id, data.Employee_id, data.SecEmployee_id, data.UserId, data.SecUserId, data.CommitteeRole]
        connection.query(query, VALUES, callback)
    },
    update: (id, data, callback) => {
        const query = `UPDATE scorecommittee_detail SET ScoreCommittee_id = ? , Employee_id = ? , SecEmployee_id = ? , UserId = ? , SecUserId = ? WHERE _id = ${id}`
        const VALUES = [data.ScoreCommittee_id, data.Employee_id, data.SecEmployee_id, data.UserId, data.SecUserId]
        connection.query(query, VALUES, callback)
    },

}

module.exports = ScoreCommitteeDetailModel