const workDepartmentModel = require("../models/WorkDepartmentModel")
const workPositionModel = require("../models/WorkPositionModel")
const EmployeeModel = require("../models/EmployeeModel")
const roleModel = require("../models/RoleModel")
const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
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
                EmployeeModel.fetchAllEmployee((err, Employee) => {
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
                    workDepartmentModel.fetchAllWorkDepartment((err, WorkDepartMent) => {
                        if (err) {
                            return res.status(400).json({
                                message: err
                            })
                        }
                        workPositionModel.fetchAllWorkPosition((err, WorkPosition) => {
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
                                res.render("employee/employee", { Employee: Employee, WorkDepartMent: WorkDepartMent, WorkPosition: WorkPosition, Role: Role, User: User[0] })
                            })
                        })
                    })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
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
                EmployeeModel.fetchAllEmployeeFromTrash((err, Employee) => {
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
    // them
    create = async (req, res, next) => {
        EmployeeModel.findEmployeeAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                if (data.length === 0) {
                    EmployeeModel.AddEmployee({
                        Code: req.body.Code,
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
                        CreatorUser_id: req.body.CreatorUser_id,
                    }, (err, data) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Internal Server Error'
                            });
                        } else {
                            return res.status(201).json({
                                message: 'Thêm mới thành công'
                            });
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: "Tên đã tồn tại"
                    })
                }
            }
        })

    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            const id = req.params.id
            EmployeeModel.deleteEmployeeToTrash(id, UserDataCookie?._id, (err, result) => {
                if (err) {
                    return res.status(400).json({
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
    // xoa
    remove(req, res, next) {
        const id = req.params.id
        EmployeeModel.deleteEmployee(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(203).json({
                    message: "Xoa thanh cong"
                })
            }
        })
    }
    // khoi phuc
    revert(req, res, next) {
        const id = req.params.id
        EmployeeModel.revertEmployee(id, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            } else {
                return res.status(200).json({
                    message: "Khôi phục thành công"
                })
            }
        })
    }
    // update
    update(req, res, next) {
        const id = req.params.id
        EmployeeModel.findEmployeeUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                if (data.length === 0) {
                    EmployeeModel.updateEmployee(id, ({
                        Code: req.body.Code,
                        FullName: req.body.FullName,
                        Email: req.body.Email,
                        Avatar: req.file ? req.file.path : req.body.Avatar,
                        Gender: req.body.Gender,
                        DoB: req.body.DoB,
                        Phone: req.body.Phone,
                        Address: req.body.Address,
                        WorkDepartment_id: req.body.WorkDepartment_id,
                        WorkPosition_id: req.body.WorkPosition_id,
                        roleId: req.body.roleId
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
                    return res.status(400).json({
                        message: "Tên đã tồn tại"
                    })
                }
            }
        })
    }
}

module.exports = new EmployeeControllers