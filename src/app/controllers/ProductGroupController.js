const ProductGroupModel = require("../models/ProductGroupModel")
const CustomerModel = require("../models/CustomermanageModel")
class ProductGroupControllers {
    // fetchAll
    index(req, res, next) {
        ProductGroupModel.fetchAllProductGroup((err, ProductGroup) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!ProductGroup) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            CustomerModel.getAllCustomer((err, Customer) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }

                res.render("productGroup/productGroup", { params: "Nhóm sản phẩm", subParams: "danh sách nhóm sản phẩm", ProductGroup: ProductGroup, Customer: Customer })
            })
        })
    }
    // hien thi trong thung rac
    getAllProductGroupFromTrash(req, res, next) {
        ProductGroupModel.fetchAllProductFromTrash((err, ProductGroup) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            if (!ProductGroup) {
                return res.status(400).json({
                    message: "Lỗi"
                })
            }
            res.render("productGroup/trash", { params: "Nhóm sản phẩm", subParams: "khôi phục nhóm sản phẩm", ProductGroup: ProductGroup })
        })
    }
    // them
    create(req, res, next) {
        ProductGroupModel.AddProductGroup({
            code: req.body.code,
            productGroup_name: req.body.productGroup_name,
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
        ProductGroupModel.deleteProductGroupToTrash(id, (err, result) => {
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
        ProductGroupModel.deleteProductGroup(id, (err, result) => {
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
        ProductGroupModel.revertProductGroup(id, (err, data) => {
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
        ProductGroupModel.updateProductGroup(id, ({
            code: req.body.code,
            productGroup_name: req.body.productGroup_name,
            note: req.body.note,
            status: req.body.status === 'on' ? 1 : 0
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

module.exports = new ProductGroupControllers