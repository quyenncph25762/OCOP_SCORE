const ScoreFileModel = require("../../models/ScoreFileModel")
const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env

class ScoreFileController {
    index(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ScoreFileModel.getAll((err, ScoreTemp) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    res.render("client/scoreFile", { User: User[0], ScoreTemp: ScoreTemp })
                })
            })
        }

    }
    createScoreFile(req, res) {
        ScoreFileModel.create({
            IsActive: req.body.IsActive === true ? 1 : 0,
            ...req.body
        }, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
        })
    }

    update(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                res.render("client/updateScoreFile", { User: User[0] })
            })
        }

    }
}

module.exports = new ScoreFileController