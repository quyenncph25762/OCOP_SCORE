const EmployeeModel = require("../models/EmployeeModel")
const workDepartmentModel = require("../models/WorkDepartmentModel")
const workPositionModel = require("../models/WorkPositionModel")
const roleModel = require("../models/RoleModel")
class ProductGroupControllers {
    // fetchAll
    index(req, res, next) {
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
                        res.render("employee/employee", { Employee: Employee, WorkDepartMent: WorkDepartMent, WorkPosition: WorkPosition, Role: Role })
                    })
                })
            })

        })
    }
    // hien thi trong thung rac
    getAllEmployeeFromTrash(req, res, next) {
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
            res.render("employee/trash", { Employee: Employee })
        })
    }
    // them
    create = async (req, res, next) => {

        EmployeeModel.AddEmployee({
            code: req.body.code,
            fullName: req.body.fullName,
            email: req.body.email,
            avatar: req.file.path,
            gender: req.body.gender,
            birthDay: req.body.birthDay,
            tel: req.body.tel,
            address: req.body.address,
            workDepartmentId: req.body.workDepartmentId,
            workPositionId: req.body.workPositionId,
            roleId: req.body.roleId
        }, (err, data) => {
            if (err) {
                console.error('Lỗi thêm sản phẩm:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('back')
            }
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const id = req.params.id
        EmployeeModel.deleteEmployeeToTrash(id, (err, result) => {
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
    // xoa
    remove(req, res, next) {
        const id = req.params.id
        EmployeeModel.deleteEmployee(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                res.redirect('back')
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
        EmployeeModel.updateEmployee(id, ({
            code: req.body.code,
            fullName: req.body.fullName,
            email: req.body.email,
            avatar: req.file ? req.file.path : req.body.image,
            gender: req.body.gender,
            birthDay: req.body.birthDay,
            tel: req.body.tel,
            address: req.body.address,
            workDepartmentId: req.body.workDepartmentId,
            workPositionId: req.body.workPositionId,
            roleId: req.body.roleId
        }), (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: `${err}: Loi updateEmployee`
                })
            }
            res.redirect("back")
        })

    }
}

module.exports = new ProductGroupControllers