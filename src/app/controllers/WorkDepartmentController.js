const WorkDepartmentModel = require("../models/WorkDepartmentModel")
class WorkDepartmentController {
    // fetchAll
    index(req, res, next) {
        WorkDepartmentModel.fetchAllWorkDepartment((err, workDepartment) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!workDepartment) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            res.render("workDepartment/workDepartment", { workDepartment: workDepartment })
        })
    }
    // hien thi trong thung rac
    getAllWorkDepartmentFromTrash(req, res, next) {
        WorkDepartmentModel.fetchAllWorkDepartmentFromTrash((err, workDepartment) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!workDepartment) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            res.render("workDepartment/trash", { workDepartment: workDepartment })
        })
    }
    // them
    create(req, res, next) {
        WorkDepartmentModel.AddWorkDepartment({
            code: req.body.code,
            title: req.body.title,
            description: req.body.description
        }, (err, data) => {
            if (err) {
                console.error('Lỗi thêm sản phẩm:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('Sản phẩm đã được thêm thành công:');
                res.redirect('back')
            }
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
        const id = req.params.id
        WorkDepartmentModel.deleteWorkDepartmentToTrash(id, (err, result) => {
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
        WorkDepartmentModel.deleteWorkDepartment(id, (err, result) => {
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
        WorkDepartmentModel.revertWorkDepartment(id, (err, data) => {
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
        console.log(req.body)
        const id = req.params.id
        WorkDepartmentModel.updateWorkDepartment(id, ({
            code: req.body.code,
            title: req.body.title,
            description: req.body.description
        }), (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: `${err}: Loi updateWorkDepartment`
                })
            }
            return res.status(200).json(res.redirect("back"))
        })

    }
}

module.exports = new WorkDepartmentController