const connection = require("../../config/db")

const ScoreCommitteeModel = {
    // hien tat ca
    getAll: (callback) => {
        const query = `SELECT
        scorecommittee.*,
        yearreview.yearName AS year_name
        FROM scorecommittee
        JOIN 
        yearreview ON yearreview._id = scorecommittee.yearReviewId
        WHERE scorecommittee.IsDeleted = 0`
        // const query = `SELECT * FROM scorecommittee WHERE IsDeleted = 0`
        connection.query(query, callback)
    },
    getAllFromTrash: (callback) => {
        const query = `SELECT
        scorecommittee.*,
        yearreview.yearName AS year_name
        FROM scorecommittee
        JOIN 
        yearreview ON yearreview._id = scorecommittee.yearReviewId
        WHERE scorecommittee.IsDeleted = 1`
        // const query = `SELECT * FROM scorecommittee WHERE IsDeleted = 0`
        connection.query(query, callback)
    },
    // tao moi
    create: (scoreCommittee, callback) => {
        const query = `INSERT INTO scorecommittee (CreatorUser_id,Code,Note,Name,IsActive) VALUES (?,?,?,?,?)`
        connection.query(query, scoreCommittee, callback)
    },
    // cap nhat
    update: (id, scoreCommittee, callback) => {
        const query = `UPDATE scorecommittee SET CreatorUser_id = ? , Code = ? , Note = ? , Name = ? , IsActive = ? WHERE _id = ?`
        const VALUES = [scoreCommittee.CreatorUser_id, scoreCommittee.Code, scoreCommittee.Note, scoreCommittee.Name, scoreCommittee.IsActive, id]
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