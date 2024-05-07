const RoleModel = require("../models/RoleModel")
class ProductGroupControllers {
    // fetchAll
    index(req, res, next) {
        RoleModel.fetchAllRole((err, Role) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!Role) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }


            res.render("role/role", { Role: Role })
        })
    }
    // hien thi trong thung rac
    getAllRoleFromTrash(req, res, next) {
        RoleModel.fetchAllRoleFromTrash((err, Role) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!Role) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            res.render("role/trash", { Role: Role })
        })
    }
    // them
    create(req, res, next) {
        RoleModel.AddRole({
            title: req.body.title,
            status: req.body.status ? 1 : 0,
            note: req.body.note
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
        RoleModel.deleteRoleToTrash(id, (err, result) => {
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
        RoleModel.deleteRole(id, (err, result) => {
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
        RoleModel.revertRole(id, (err, data) => {
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
        RoleModel.updateRole(id, ({
            title: req.body.title,
            note: req.body.note,
            status: req.body.status === 'on' ? 1 : 0
        }), (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: `${err}: Loi updateRole`
                })
            }
            return res.status(200).json(res.redirect("back"))
        })

    }
}

module.exports = new ProductGroupControllers