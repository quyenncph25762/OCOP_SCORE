const connection = require("../../../config/db")

const ScoreCommitteeModel = {
    // hien tat ca
    getAllIsNull: (callback) => {
        const query = `SELECT
        scorecommittee.*,
        yearreview.yearName AS year_name,
        employee.FullName AS employee_name
        FROM scorecommittee
        LEFT JOIN 
        yearreview ON yearreview._id = scorecommittee.yearReviewId
        LEFT JOIN
        employee ON employee._id = scorecommittee.Employee_id
        WHERE scorecommittee.IsDeleted = 0 AND scorecommittee.DistrictId IS NULL  ORDER BY scorecommittee._id DESC`
        // const query = `SELECT * FROM scorecommittee WHERE IsDeleted = 0`
        connection.query(query, callback)
    },
    // hien tat ca
    getAllByDistrict: (DistrictId, callback) => {
        const query = `SELECT
        scorecommittee.*,
        yearreview.yearName AS year_name,
        employee.FullName AS employee_name
        FROM scorecommittee
        LEFT JOIN 
        yearreview ON yearreview._id = scorecommittee.yearReviewId
        LEFT JOIN
        employee ON employee._id = scorecommittee.Employee_id
        WHERE scorecommittee.IsDeleted = 0 AND scorecommittee.DistrictId ${DistrictId ? `= ${DistrictId}` : 'IS NULL'} ORDER BY scorecommittee._id DESC`
        connection.query(query, callback)
    },
    getAllFromTrash: (callback) => {
        const query = `SELECT
        scorecommittee.*,
        yearreview.yearName AS year_name
        FROM scorecommittee
        JOIN 
        yearreview ON yearreview._id = scorecommittee.yearReviewId
        WHERE scorecommittee.IsDeleted = 1 ORDER BY scorecommittee._id DESC`
        // const query = `SELECT * FROM scorecommittee WHERE IsDeleted = 0`
        connection.query(query, callback)
    },
    getOne: (id, callback) => {
        const query = `SELECT * FROM scorecommittee WHERE _id = ${id}`
        connection.query(query, callback)
    },
    // tao moi
    create: (scoreCommittee, callback) => {
        const query = `INSERT INTO scorecommittee (CreatorUser_id,Note,Name,IsActive,yearReviewId,DistrictId) VALUES (?,?,?,?,?,?)`
        const VALUES = [scoreCommittee.CreatorUser_id, scoreCommittee.Note, scoreCommittee.Name, scoreCommittee.IsActive, scoreCommittee.yearReviewId, scoreCommittee.DistrictId]
        connection.query(query, VALUES, callback)
    },
    // cap nhat
    update: (id, scoreCommittee, callback) => {
        const query = `UPDATE scorecommittee SET Note = ? , Name = ? , IsActive = ?, yearReviewId = ? WHERE _id = ?`
        const VALUES = [scoreCommittee.Note, scoreCommittee.Name, scoreCommittee.IsActive, scoreCommittee.yearReviewId, id]
        connection.query(query, VALUES, callback)
    },
    // cap nhat chu tich hoi dong
    updateCharmanScoreCommittee: (id, scoreCommittee, callback) => {
        const query = `UPDATE scorecommittee SET Employee_id = ? WHERE _id = ${id}`
        const VALUES = [scoreCommittee.Employee_id]
        connection.query(query, VALUES, callback)
    },
    // cap nhat IsDefault
    updateIsDefaultScoreCommittee: (id, scoreCommittee, callback) => {
        const query = `UPDATE scorecommittee SET IsDefault = ? WHERE _id = ${id}`
        const VALUES = [scoreCommittee.IsDefault]
        connection.query(query, VALUES, callback)
    },
    findScoreCommitteeUpdate(id, scoreCommittee, callback) {
        const query = `SELECT * FROM scorecommittee WHERE Name = ? AND _id !=${id}`
        const VALUES = [scoreCommittee.Name]
        connection.query(query, VALUES, callback)
    },
    findScoreCommitteeAdd(scoreCommittee, callback) {
        const query = `SELECT * FROM scorecommittee WHERE Name = ?`
        const VALUES = [scoreCommittee.Name]
        connection.query(query, VALUES, callback)
    },
    // Xoa vao thung rac
    removeToTrash: (id, callback) => {
        const query = `UPDATE scorecommittee SET IsDeleted = 1 WHERE _id = ${id}`
        connection.query(query, callback)
    },
    // phuc hoi
    revert: (id, callback) => {
        const query = `UPDATE scorecommittee SET IsDeleted = 0 WHERE _id = ${id}`
        connection.query(query, callback)
    },
}

module.exports = ScoreCommitteeModel