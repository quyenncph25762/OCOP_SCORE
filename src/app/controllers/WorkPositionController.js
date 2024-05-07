const WorkPositionModel = require("../models/WorkPositionModel")
class WorkPositionControllers {
    // fetchAll
    index(req, res, next) {
        WorkPositionModel.fetchAllWorkPosition((err, workPosition) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!workPosition) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            res.render("workPosition/workPosition", { workPosition: workPosition })
        })
    }
    // hien thi trong thung rac
    getAllWorkPositionModelFromTrash(req, res, next) {
        WorkPositionModel.fetchAllWorkPositionFromTrash((err, workPosition) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!workPosition) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            res.render("workPosition/trash", { workPosition: workPosition })
        })
    }
    // them
    create(req, res, next) {
        WorkPositionModel.AddWorkPosition({
            code: req.body.code,
            title: req.body.title,
            manager: req.body.manager ? 1 : 0,
            active: req.body.active ? 1 : 0,
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
        WorkPositionModel.deleteWorkPositionToTrash(id, (err, result) => {
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
        WorkPositionModel.deleteWorkPosition(id, (err, result) => {
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
        WorkPositionModel.revertWorkPosition(id, (err, data) => {
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
        WorkPositionModel.updateProductGroup(id, ({
            code: req.body.code,
            title: req.body.title,
            note: req.body.note,
            manager: req.body.manager === 'on' ? 1 : 0,
            active: req.body.active === 'on' ? 1 : 0
        }), (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: `${err}: Loi updateProductGroup`
                })
            }
            return res.status(200).json(res.redirect("back"))
        })

    }
}

module.exports = new WorkPositionControllers