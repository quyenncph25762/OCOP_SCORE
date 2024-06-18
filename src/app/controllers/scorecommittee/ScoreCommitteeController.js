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
                ScoreCommitteeModel.getAllByDistrict(User[0]?.DistrictId, (err, ScoreCommittee) => {
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
                        EmployeeModel.fetchAllEmployeeByDistrict(User[0]?.DistrictId, (err, Employee) => {
                            if (err) {
                                return res.status(500).json({
                                    message: err
                                })
                            }
                            WorkDepartmentModal.fetchAllWorkDepartment(User[0]?.DistrictId, (err, WorkDepartment) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: err
                                    })
                                }
                                workPositionModal.fetchAllWorkPosition(User[0]?.DistrictId, (err, WorkPosition) => {
                                    if (err) {
                                        return res.status(500).json({
                                            message: err
                                        })
                                    }
                                    // loc ra nhung employee khong khoa
                                    const EmployeeFilter = Employee.filter((employee) => employee.isLock === 0)
                                    res.render("scoreCommittee/scoreCommittee", { User: User[0], ScoreCommittee: ScoreCommittee, YearReview: YearReview, Employee: EmployeeFilter, WorkDepartment: WorkDepartment, WorkPosition: WorkPosition })
                                })
                            })
                        })


                    })
                })
            })
        }
    }
    // getOneScoreCommitt
    getOne = async (req, res) => {
        const idSocreCommitte = req.params.id
        const ScoreCommittee = await ScoreCommitteeModel.getOneById(idSocreCommitte)
        if (!ScoreCommittee) {
            return res.status(204).json({
                message: "Khong co scoreCommittee nao"
            })
        }
        return res.status(200).json(ScoreCommittee[0])
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
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                ScoreCommitteeModel.create({
                    DistrictId: User[0]?.DistrictId,
                    ...req.body
                }, async (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: err
                        })
                    }
                    const data = await ScoreCommitteeModel.getOneById(results.insertId)
                    return res.status(201).json(
                        {
                            message: "Thêm thành công",
                            ScoreCommittee: data[0]
                        }
                    )
                })
            })
        }

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
            // lay danh sach scoreCommiteeDetail
            ScoreCommitteeDetailModel.getByScoreCommittee(id, (err, listScoreCommitteeDetail) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }

                // tao ra 1 mang chua id llistScoreCommitteeDetail
                const listEmployeeId = Array.from(
                    new Set(listScoreCommitteeDetail
                        .map(employee => [employee.UserId, employee.SecUserId])
                        .flat()
                        .filter(id => id !== undefined && id !== null && id !== 0))
                )
                // console.log(`listScoreCommitteeDetail:`, listEmployeeId)
                // lay scorefile theo status = 0
                ScoreFileModel.getScoreFileByStatus(async (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    // lay danh sach admin de admin co the xem dc phieu 
                    EmployeeModel.getAllAdmin(async (err, employeesAdmin) => {
                        if (err) {
                            return res.status(500).json({
                                message: err
                            })
                        }

                        // loc scorefile nhung employee nao dang o trong scorecommitteeDetail
                        const dataFilter = Array.from(new Set(data.filter((item) => listEmployeeId.includes(item.forEmployeeId))))
                        await filterEmployee(dataFilter, listEmployeeId, id)
                        // nhung scorefile nao k co trong scoreCommittee thi them scoreCommittee tranh truong hop get all scorefile status = 0
                        const dataFilterDifferent = data.filter((item) => !listEmployeeId.includes(item.forEmployeeId))
                        const formScoreFile = {
                            ScoreCommitee_id: id,
                            IsActive: 1
                        }
                        await dataFilter.forEach(async (element) => {
                            if (!element.ScoreCommitee_id || element.ScoreCommitee_id === Number(id)) {
                                // thuc hien cap nhat trang thai cham diem cho scorefile
                                await ScoreFileModel.updateScoreCommitteOnScoreFile(element._id, formScoreFile, (err, result) => {
                                    if (err) {
                                        return res.status(500).json({
                                            message: err
                                        })
                                    }
                                })
                            }
                        })
                        // console.log(`Nhung em ployee k co trong scorecommitt:`, dataFilterDifferent)
                        // thuc hien chi update scoreCommittee 
                        await dataFilterDifferent.forEach(async (element) => {
                            if (!element.ScoreCommitee_id || element.ScoreCommitee_id === Number(id)) {
                                // thuc hien cap nhat trang thai cham diem cho scorefile
                                await ScoreFileModel.updateScoreCommitteOnScoreFile(element._id, {
                                    ScoreCommitee_id: id,
                                    IsActive: 0
                                }, (err, result) => {
                                    if (err) {
                                        return res.status(500).json({
                                            message: err
                                        })
                                    }
                                })
                            }
                        })
                        return res.status(203).json({
                            message: "Cập nhật thành công"
                        })
                    })
                })
            })
        })

        // ham xu li loc nhung employee chua co scorefile trong hoi dong roi them vao
        async function filterEmployee(listScoreFile, listEmployeeId, idScoreCommittee) {
            // lay ra nhung id cua employee da co scorefile trong hoi dong cham
            const arrId = listScoreFile.map((item) => item.forEmployeeId)
            // lay ra arr productid de them vao employee moi
            // loc ra nhung scorefile nao dang cham , neu ma san pham do cham xong het roi thi se khong dc set
            const arrProductId = Array.from(new Set(listScoreFile.filter((scorefile) => scorefile.Product_id && (scorefile.Status === 0 || scorefile.Status === 1)).map((item) => item.Product_id)))
            // Loc ra id chua co scorefile trong hoi dong
            console.log(`arrProductId:`, arrProductId)
            const filterEmployeeId = listEmployeeId.filter((item) => !arrId.includes(item))
            console.log(`filterEmployeeId:`, filterEmployeeId)
            if (filterEmployeeId.length > 0) {
                for (const employee of filterEmployeeId) {
                    console.log(`employee:`, employee)
                    // 1 employee them nhieu scorefile theo product_id
                    for (let i = 0; i < arrProductId.length; i++) {
                        console.log(`arrProductId[i]:`, arrProductId[i])
                        ScoreFileModel.create({
                            forEmployeeId: employee,
                            IsActive: 1,
                            ScoreCommitee_id: idScoreCommittee,
                            Status: 0,
                            Product_id: Number(arrProductId[i]),
                            CreatorUser_id: Number(employee),
                        }, (err) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Lỗi truy vấn"
                                })
                            }
                        })
                    }
                }
            }
        }
    }
    // update IsActive
    updateIsActive = async (req, res) => {
        try {
            const id = req.params.id
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    ScoreFileModel.getScoreFileByScoreCommitteeAll(id, async (err, listScoreFile) => {
                        if (err) {
                            return console.log(err)
                        }
                        // console.log(`listScoreFile:`, listScoreFile)
                        // loc nhung employee = null va khac voi id cua nguoi tao ra hoi dong de xoa
                        const listEmployeeFilter = listScoreFile.filter((scorefile) => !scorefile.Employee_id && scorefile.forEmployeeId != User[0]._id || scorefile.Status < 2)
                        console.log(`listEmployeeFilter:`, listEmployeeFilter)
                        await listEmployeeFilter.forEach(async (scorefile) => {
                            await ScoreFileModel.remove(scorefile._id)
                        })
                        // Cap nhat IsActive
                        await ScoreCommitteeModel.updateIsActive(id, req.body)
                        return res.status(203).json({
                            message: "Cập nhật thành công"
                        })
                    })
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new ScoreCommitteController