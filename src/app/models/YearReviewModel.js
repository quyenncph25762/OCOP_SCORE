const connection = require("../../config/db")

const YearReviewModel = {
    fetchAllReviewYear: (callback) => {
        const query = `SELECT * FROM yearreview WHERE isDeleted = 0`
        connection.query(query, callback)
    },
    // lay tat ca trong thung rac
    fetchAllYearFromTrash: (callback) => {
        const query = `SELECT * FROM yearreview WHERE yearreview.isDeleted = 1`
        connection.query(query, callback)
    },
    // them
    AddYear: (year, callback) => {
        const query = `INSERT INTO yearreview (yearName,status,note) VALUES (?,?,?)`
        const values = [year.yearName, year.status, year.note]
        connection.query(query, values, callback)
    },
    // xoa vao thung rac
    deleteYearToTrash: (id, callback) => {
        const query = `UPDATE yearreview SET isDeleted = 1 WHERE _id = ${id}`
        connection.query(query, id, callback)
    },
    // xoa
    deleteYear: (id, callback) => {
        const query = `DELETE FROM yearreview WHERE _id = ?`
        connection.query(query, id, callback)
    },
    // khoi phuc
    revertYear: (id, callback) => {
        const query = `UPDATE yearreview SET isDeleted = 0 WHERE _id=${id}`
        connection.query(query, id, callback)
    },
    // lay 1 doi tuong
    getOneYear: (id, callback) => {
        const query = `SELECT * FROM yearreview WHERE _id= ?`
        connection.query(query, [id], callback)
    },
    //  cap nhat doi tuong
    updateYear: (id, year, callback) => {
        const query = `UPDATE yearreview SET  yearName = ? , status = ? , note = ? WHERE _id=${id}`
        const values = [year.yearName, year.status, year.note]
        connection.query(query, values, callback)
    },
}

module.exports = YearReviewModel