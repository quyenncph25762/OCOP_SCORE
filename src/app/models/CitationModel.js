const connection = require("../../config/db")

const CitationModel = {
    getAllCitation: (callback) => {
        const query = `SELECT * FROM citation`
        connection.query(query, callback)
    }
}

module.exports = CitationModel