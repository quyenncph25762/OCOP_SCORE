const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const AccountModel = require("../../models/Account");
const ScoreFileProvinceModel = require("../../models/scorefileProvince/ScoreFileProvinceModel");
dotenv.config();
const { SECRET_CODE } = process.env
class ScoreFileProvinceController {
    index = async (req, res) => {
        try {
            const ScoreFileId = req.params.id
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    ScoreFileProvinceModel.getScoreFileByEmployee(UserDataCookie?._id, (err, ScoreFile) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }
                        console.log(ScoreFile)
                        res.render("scoreFileProvince/scoreFileProvince", { User: User[0], ScoreFile: ScoreFile })
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ScoreFileProvinceController