const workDepartmentModel = require("../../models/workdepartment/WorkDepartmentModel")
const workPositionModel = require("../../models/workposition/WorkPositionModel")
const EmployeeModel = require("../../models/employee/EmployeeModel")
const roleModel = require("../../models/role/RoleModel")
const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const DistrictModel = require("../../models/District")
dotenv.config();
const { SECRET_CODE } = process.env
class EmployeeControllers {
    // fetchAll
    index(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                EmployeeModel.fetchAllEmployeeByDistrict(User[0].DistrictId, (err, Employee) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    workDepartmentModel.fetchAllWorkDepartment(User[0].DistrictId, (err, WorkDepartMent) => {
                        if (err) {
                            return res.status(400).json({
                                message: err
                            })
                        }
                        workPositionModel.fetchAllWorkPosition(User[0].DistrictId, (err, WorkPosition) => {
                            if (err) {
                                return res.status(400).json({
                                    message: err
                                })
                            }
                            roleModel.fetchAllRole((err, Role) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: err
                                    })
                                }
                                DistrictModel.getAllDistrict((err, district) => {
                                    if (err) {
                                        return res.status(400).json({
                                            message: err
                                        })
                                    }
                                    // console.log(object)
                                    res.render("employee/employee", { Employee: Employee, WorkDepartMent: WorkDepartMent, WorkPosition: WorkPosition, Role: Role, User: User[0], District: district })
                                })
                            })
                        })
                    })
                })

            })
        } else {
            res.redirect("/auth/loginPage")
        }
    }
    // getAll 
    getAll(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                if (User.length > 0) {
                    EmployeeModel.fetchAllEmployeeByDistrict(User[0].DistrictId, (err, data) => {
                        if (err) {
                            return res.status(500).json({
                                message: err
                            })
                        }
                        return res.status(200).json(data)
                    })
                }
            })
        }

    }
    // hien thi trong thung rac
    getAllEmployeeFromTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                EmployeeModel.fetchAllEmployeeFromTrash(User[0].DistrictId, (err, Employee) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    if (!Employee) {
                        return res.status(400).json({
                            message: "Lỗi"
                        })
                    }
                    res.render("employee/trash", { Employee: Employee, User: User[0] })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }
    }
    // get ra nhung tai khoan co role la admin
    // them
    create = async (req, res, next) => {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                EmployeeModel.findEmployeeAdd(req.body, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Loi truy van"
                        })
                    } else {
                        if (data.length === 0) {
                            EmployeeModel.AddEmployee({
                                Code: req.body.Code,
                                Password: req.body.Password,
                                FullName: req.body.FullName,
                                UserName: req.body.UserName,
                                Email: req.body.Email,
                                Avatar: req.file ? req.file.path : req.body.Gender === "nam" ? "Uploads/user_boy.jpg" : "Uploads/user_girl.png",
                                Gender: req.body.Gender,
                                DoB: req.body.DoB,
                                Phone: req.body.Phone,
                                Address: req.body.Address,
                                WorkDepartment_id: Number(req.body.WorkDepartment_id),
                                WorkPosition_id: Number(req.body.WorkPosition_id),
                                roleId: Number(req.body.roleId),
                                CreatorUser_id: Number(req.body.CreatorUser_id),
                                DistrictId: req.body.DistrictId === '0' ? null : Number(req.body.DistrictId)
                            }, (err, data) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        message: 'Thêm mới thành công'
                                    });
                                }
                            })
                        } else {
                            const conflictFields = data.map(row => row.conflictField).join(', ');
                            return res.status(400).json({
                                message: `${conflictFields} đã tồn tại`
                            });
                        }
                    }
                })
            })
        }
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const cookie = req.cookies
        const id = req.params.id
        if (cookie?.User) {
            console.log(id)
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            EmployeeModel.deleteEmployeeToTrash(id, UserDataCookie?._id, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                } else {
                    return res.status(203).json({
                        message: "Xoa thanh cong"
                    })
                }
            })
        }
    }
    // xoa vao thung rac nhieu
    removeToTrashAll = async (req, res, next) => {
        try {
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                for (const id of req.body) {
                    await EmployeeModel.deleteEmployeeToTrashAll(id, UserDataCookie?._id)
                }
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // xoa
    remove(req, res, next) {
        const id = req.params.id
        EmployeeModel.deleteEmployee(id, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(404).send(err);
            } else {
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })
            }
        })
    }
    // khoi phuc
    revert = async (req, res, next) => {
        try {
            const id = req.params.id
            await EmployeeModel.revertEmployee(id)
            return res.status(200).json({
                message: "Khôi phục thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // khoi phuc nhieu
    revertAll = async (req, res, next) => {
        try {
            for (const id of req.body) {
                await EmployeeModel.revertEmployee(id)
            }
            return res.status(200).json({
                message: "Khôi phục thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // update
    update(req, res, next) {
        const id = req.params.id
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                EmployeeModel.findEmployeeUpdate(id, req.body, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Loi truy van"
                        })
                    } else {
                        if (data.length === 0) {
                            EmployeeModel.updateEmployee(id, ({
                                UserName: req.body.UserName,
                                FullName: req.body.FullName,
                                Email: req.body.Email,
                                Avatar: req.file ? req.file.path : req.body.Avatar,
                                Gender: req.body.Gender,
                                DoB: req.body.DoB,
                                Phone: req.body.Phone,
                                Address: req.body.Address,
                                WorkDepartment_id: req.body.WorkDepartment_id,
                                WorkPosition_id: req.body.WorkPosition_id,
                                roleId: req.body.roleId,
                                DistrictId: req.body.DistrictId || null
                            }), (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: `${err}: Loi updateEmployee`
                                    })
                                }
                                return res.status(201).json({
                                    message: 'Cập nhật thành công'
                                });
                            })
                        } else {
                            const conflictFields = data.map(row => row.conflictField).join(', ');
                            return res.status(400).json({
                                message: `${conflictFields} đã tồn tại`
                            });
                        }
                    }
                })
            })
        }
    }
}

module.exports = new EmployeeControllers