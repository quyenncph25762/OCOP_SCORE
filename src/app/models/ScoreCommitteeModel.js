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
        WHERE scorecommittee.IsDeleted = 0 ORDER BY scorecommittee._id DESC`
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
        const query = `INSERT INTO scorecommittee (CreatorUser_id,Note,Name,IsActive,yearReviewId) VALUES (?,?,?,?,?)`
        const VALUES = [scoreCommittee.CreatorUser_id, scoreCommittee.Note, scoreCommittee.Name, scoreCommittee.IsActive, scoreCommittee.yearReviewId]
        connection.query(query, VALUES, callback)
    },
    // cap nhat
    update: (id, scoreCommittee, callback) => {
        const query = `UPDATE scorecommittee SET CreatorUser_id = ?  , Note = ? , Name = ? , IsActive = ?, yearReviewId = ? WHERE _id = ?`
        const VALUES = [scoreCommittee.CreatorUser_id, scoreCommittee.Note, scoreCommittee.Name, scoreCommittee.IsActive, scoreCommittee.yearReviewId, id]
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