const WorkPositionModel = require("../models/WorkPositionModel")
class AuthController {
    login = (req, res) => {
        res.render("auth/login")
    }
    register = (req, res) => {
        WorkPositionModel.fetchAllWorkPosition((err, WorkPosition) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            res.render("auth/register", { WorkPosition: WorkPosition })
        })
    }
    resetPassword = (req, res) => {
        res.render("auth/resetPassword")
    }
}

module.exports = new AuthController