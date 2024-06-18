const ProductGroupModel = require("../../models/productgroup/ProductGroupModel")
const CustomerModel = require("../../models/customer/CustomermanageModel")
const AccountModel = require("../../models/Account")
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
                    CustomerModel.getAllCustomer(User[0]?.DistrictId, (err, Customer) => {
                        if (err) {
                            return res.status(400).json({
                                message: err
                            })
                        }
                        res.render("productGroup/productGroup", { params: "Nhóm sản phẩm", subParams: "danh sách nhóm sản phẩm", ProductGroup: ProductGroup, Customer: Customer, User: User[0] })
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
                    res.render("productGroup/trash", { params: "Nhóm sản phẩm", subParams: "khôi phục nhóm sản phẩm", ProductGroup: ProductGroup, User: User[0] })
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
                ProductGroupModel.AddProductGroup(req.body, (err, data) => {
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
                    message: "Tên nhóm sản phẩm đã tồn tại"
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
    // xoa vao thung rac nhieu
    removeToTrashAll = async (req, res) => {
        try {
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    for (const id of req.body) {
                        await ProductGroupModel.deleteProductGroupToTrashAll(id, User[0]?._id)
                    }
                    return res.status(203).json({
                        message: "Xoa thanh cong"
                    })
                })
            }
        } catch (error) {
            console.log(error)
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
    // xoa nhieeuf
    removeAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await ProductGroupModel.deleteProductGroupAll(id)
            }
            return res.status(203).json({
                message: "Xóa thành thành công"
            })
        } catch (error) {
            console.log(error)
        }
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
    // khoi phuc nhieeuf
    revertAll = async (req, res) => {
        try {
            for (const id of req.body) {
                await ProductGroupModel.revertProductGroupAll(id)
            }
            return res.status(203).json({
                message: "khoi phuc thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // update
    update(req, res, next) {
        const id = req.params.id
        ProductGroupModel.findProductGroupUpdate(id, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy xuat"
                })
            }
            if (data.length === 0) {
                ProductGroupModel.updateProductGroup(id, req.body, (err, result) => {
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
                    message: "Tên nhóm sản phẩm đã tồn tại"
                })
            }
        })
    }
}

module.exports = new ProductGroupControllers