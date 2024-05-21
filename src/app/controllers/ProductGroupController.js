const ProductGroupModel = require("../models/ProductGroupModel")
const CustomerModel = require("../models/CustomermanageModel")
const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class ProductGroupControllers {
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
                        if (User?.[0].role_title.toLowerCase() !== "admin") {
                            res.redirect("/client")
                        } else {
                            res.render("productGroup/productGroup", { params: "Nhóm sản phẩm", subParams: "danh sách nhóm sản phẩm", ProductGroup: ProductGroup, Customer: Customer, User: User[0] })
                        }
                    })
                })
            })
        }

    }
    // hien thi trong thung rac
    getAllProductGroupFromTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
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
                    if (User?.[0].role_title.toLowerCase() !== "admin") {
                        res.redirect("/client")
                    } else {
                        res.render("productGroup/trash", { params: "Nhóm sản phẩm", subParams: "khôi phục nhóm sản phẩm", ProductGroup: ProductGroup, User: User[0] })
                    }
                })
            })
        }
    }
    // them
    create(req, res, next) {
        ProductGroupModel.findProductGroupAdd(req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy xuat"
                })
            }
            if (data.length === 0) {
                ProductGroupModel.AddProductGroup({
                    Name: req.body.Name,
                    IsActive: req.body.IsActive === "true" ? 1 : 0,
                    Note: req.body.Note,
                    Code: req.body.Code
                }, (err, data) => {
                    if (err) {
                        console.error('Lỗi thêm sản phẩm:', err);
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    } else {
                        return res.status(201).json({
                            message: 'Sản phẩm đã được thêm thành công'
                        });
                    }
                })
            } else {
                return res.status(400).json({
                    message: "Gia tri da ton tai"
                })
            }
        })
    }
    // xoa vao thung rac
    removeToTrash(req, res, next) {
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
                ProductGroupModel.deleteProductGroupToTrash(id, User[0]._id, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({
                            message: err
                        })
                    } else {

                        return res.status(203).json({
                            message: "Xoa thanh cong"
                        })
                    }
                })
            })
        }

    }
    // xoa
    remove(req, res, next) {
        const id = req.params.id
        ProductGroupModel.deleteProductGroup(id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(203).json({
                    message: "Xóa thành thành công"
                })
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
        ProductGroupModel.findProductGroupUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy xuat"
                })
            }
            if (data.length === 0) {
                ProductGroupModel.updateProductGroup(id, {
                    Name: req.body.Name,
                    IsActive: req.body.IsActive === "true" ? 1 : 0,
                    Note: req.body.Note,
                    Code: req.body.Code
                }, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            message: `${err}: Loi updateProductGroup`
                        })
                    }
                    return res.status(202).json({
                        message: 'Cập nhật sản phẩm thành công'
                    });
                })
            } else {
                return res.status(400).json({
                    message: "Gia tri da ton tai"
                })
            }
        })
    }
}

module.exports = new ProductGroupControllers