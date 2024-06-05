const AccountModel = require("../../models/Account")
const ScoreCommitteeModel = require("../../models/scoreCommittee/ScoreCommitteeModel")
const YearReivewModel = require("../../models/yearreview/YearReviewModel")
const EmployeeModel = require("../../models/employee/EmployeeModel")
const WorkDepartmentModal = require("../../models/workdepartment/WorkDepartmentModel")
const workPositionModal = require("../../models/workposition/WorkPositionModel")
const ScoreCommitteeDetailModel = require("../../models/scoreCommittee/ScoreCommitteeDetailModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const ScoreFileModel = require("../../models/scorefile/ScoreFileModel")
dotenv.config();
const { SECRET_CODE } = process.env
class ScoreCommitteController {
    index(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                ScoreCommitteeModel.getAll((err, ScoreCommittee) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    YearReivewModel.fetchAllReviewYear((err, YearReview) => {
                        if (err) {
                            return res.status(500).json({
                                message: err
                            })
                        }
                        EmployeeModel.fetchAllEmployee((err, Employee) => {
                            if (err) {
                                return res.status(500).json({
                                    message: err
                                })
                            }
                            WorkDepartmentModal.fetchAllWorkDepartment((err, WorkDepartment) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: err
                                    })
                                }
                                workPositionModal.fetchAllWorkPosition((err, WorkPosition) => {
                                    if (err) {
                                        return res.status(500).json({
                                            message: err
                                        })
                                    }
                                    res.render("scoreCommittee/scoreCommittee", { User: User[0], ScoreCommittee: ScoreCommittee, YearReview: YearReview, Employee: Employee, WorkDepartment: WorkDepartment, WorkPosition: WorkPosition })
                                })
                            })
                        })


                    })
                })
            })
        }
    }
    trashPage(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                ScoreCommitteeModel.getAllFromTrash((err, ScoreCommittee) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    YearReivewModel.fetchAllReviewYear((err, YearReview) => {
                        if (err) {
                            return res.status(500).json({
                                message: err
                            })
                        }
                        res.render("scoreCommittee/trash", { User: User[0], ScoreCommittee: ScoreCommittee, YearReview: YearReview })

                    })
                })
            })
        }
    }
    removeToTrash(req, res) {
        const id = req.params.id
        ScoreCommitteeModel.removeToTrash(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json(
                {
                    message: "Sửa thành công"
                }
            )
        })
    }
    revert(req, res) {
        const id = req.params.id
        ScoreCommitteeModel.revert(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json(
                {
                    message: "Khôi phục thành công"
                }
            )
        })
    }
    create(req, res) {
        ScoreCommitteeModel.create(req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            ScoreCommitteeModel.getOne(results.insertId, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                if (data.length > 0) {
                    return res.status(201).json(
                        {
                            message: "Thêm thành công",
                            ScoreCommittee: data[0]
                        }
                    )
                }
            })

        })
    }
    update(req, res) {
        const id = req.params.id
        ScoreCommitteeModel.update(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(201).json(
                {
                    message: "cập nhật thành công"
                }
            )
        })
    }
    // update chu tich hoi dong
    updateCharman(req, res) {
        const id = req.params.id
        console.log(1)
        console.log(`req body: ` + req.body)
        ScoreCommitteeModel.updateCharmanScoreCommittee(id, req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công"
            })
        })
    }
    // update IsDefault
    updateIsDefault = async (req, res) => {
        const id = req.params.id
        // cap nhat cham diem
        ScoreCommitteeModel.updateIsDefaultScoreCommittee(id, req.body, async (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            // lay danh sach scorefile co status = 0
            ScoreFileModel.getScoreFileByStatus(async (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                // roi cap nhat scoreCommiteee cua scorefile 
                await data.forEach(async (element) => {
                    await ScoreFileModel.updateScoreCommitteOnScoreFile(element._id, { ScoreCommitee_id: id }, (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                message: err
                            })
                        }
                    })
                });
                return res.status(203).json({
                    message: "Cập nhật thành công"
                })
            })
        })
    }
}

module.exports = new ScoreCommitteController