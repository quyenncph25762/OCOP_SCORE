const ProductmanageModel = require('../models/ProductmanageModel');
const CustomerModel = require("../models/CustomermanageModel")
const ProductGroupModel = require("../models/ProductGroupModel")
const ReviewModel = require("../models/YearReviewModel")
const AccountModel = require("../models/Account")
const ProductDetail = require("../models/ProductDetailModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class ProductmanageController {
    index(req, res) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ProductmanageModel.getAllProduct((err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err)
                    } else {
                        const totalPages = Math.ceil(data.length / pageSize);
                        const pages = Array.from({ length: totalPages }, (_, index) => {
                            return {
                                number: index + 1,
                                active: index + 1 === page,
                                isDots: index + 1 > 5
                            };
                        });
                        const paginatedData = data.slice(startIndex, endIndex);
                        // Chuẩn bị dữ liệu để truyền vào template
                        const viewData = {
                            data: paginatedData,
                            pagination: {
                                prev: page > 1 ? page - 1 : null,
                                next: endIndex < data.length ? page + 1 : null,
                                pages: pages,
                            },
                        };
                        // lay ten chu the
                        CustomerModel.getAllCustomer((err, Customer) => {
                            if (err) {
                                return res.status(400).json({
                                    message: `${err}: ProductControllers => CustomerModel`
                                })
                            } else {
                                ProductGroupModel.fetchAllProductGroup((err, ProductGroup) => {
                                    if (err) {
                                        return res.status(400).json({
                                            message: `${err}: ProductControllers => ProductGroupModel`
                                        })
                                    }
                                    ReviewModel.fetchAllReviewYear((err, Review) => {
                                        if (err) {
                                            return res.status(400).json({
                                                message: `${err}: ProductControllers => ReviewModel`
                                            })
                                        }
                                        ProductDetail.getAllProductDetailLimit((err, ProductDetail) => {
                                            if (err) {
                                                return res.status(400).json({
                                                    message: `${err}: ProductControllers => productDetail`
                                                })
                                            }
                                            if (!User?.[0]) {
                                                res.redirect("/auth/loginPage")
                                            } else {
                                                res.render('product_manage', { viewData: viewData, Customer: Customer, ProductGroup: ProductGroup, Review: Review, User: User[0], ProductDetail: ProductDetail });
                                            }
                                        })
                                    })
                                })
                            }
                        })
                    }
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }
    }
    // product_trash
    productTrash(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ProductmanageModel.getAllProductFromtTrash((err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err)
                    } else {
                        const totalPages = Math.ceil(data.length / pageSize);
                        const pages = Array.from({ length: totalPages }, (_, index) => {
                            return {
                                number: index + 1,
                                active: index + 1 === page,
                                isDots: index + 1 > 5
                            };
                        });
                        const paginatedData = data.slice(startIndex, endIndex);
                        // Chuẩn bị dữ liệu để truyền vào template
                        const viewData = {
                            data: paginatedData,
                            pagination: {
                                prev: page > 1 ? page - 1 : null,
                                next: endIndex < data.length ? page + 1 : null,
                                pages: pages,
                            },
                        };
                        // lay ten chu the
                        CustomerModel.getAllCustomer((err, Customer) => {
                            if (err) {
                                return res.status(400).json({
                                    message: `${err}: ProductControllers => CustomerModel`
                                })
                            } else {
                                ProductGroupModel.fetchAllProductGroup((err, ProductGroup) => {
                                    if (err) {
                                        return res.status(400).json({
                                            message: `${err}: ProductControllers => ProductGroupModel`
                                        })
                                    }
                                    ReviewModel.fetchAllReviewYear((err, Review) => {
                                        if (err) {
                                            return res.status(400).json({
                                                message: `${err}: ProductControllers => ReviewModel`
                                            })
                                        }
                                        ProductDetail.getAllProductDetailLimit((err, ProductDetail) => {
                                            if (err) {
                                                return res.status(400).json({
                                                    message: `${err}: ProductControllers => productDetail`
                                                })
                                            }
                                            if (!User?.[0]) {
                                                res.redirect("/auth/loginPage")
                                            } else {
                                                res.render('product_trash', { viewData: viewData, Customer: Customer, ProductGroup: ProductGroup, Review: Review, User: User[0], ProductDetail: ProductDetail });
                                            }
                                        })
                                    })
                                })
                            }
                        })
                    }
                })
            })
        }

    }
    // get by id
    getbyId() {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        ProductmanageModel.getProductbyId((err, data_id) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
            } else {
                const totalPages = Math.ceil(data_id.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                        isDots: index + 1 > 5
                    };
                });
                const paginatedData = data_id.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {
                    data: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };

                res.render('product_manage', viewData);
            }
        })
    }
    create(req, res) {
        console.log(req.body.Avatar)
        const product = {
            IsActive: req.body.IsActive === "true" ? 1 : 0,
            Avatar: req?.file ? req.file.path : "/Uploads/productDefault.jpg",
            CreatorUser_id: req.body.CreatorUser_id,
            Code: req.body.Code,
            Name: req.body.Name,
            Description: req.body.Description,
            Customer_id: req.body.Customer_id,
            ProductGroup_id: req.body.ProductGroup_id,
            ProductYearId: req.body.ProductYearId,
            Note: req.body.Note
        }
        ProductmanageModel.findProductAdd(product, (err, results) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
                res.json({ success: false, message: 'Lỗi truy vấn' });
            }
            else {
                if (results.length === 0) {
                    ProductmanageModel.addProduct(product, (err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({ success: false, message: 'Lỗi truy vấn' });
                        } else {
                            ProductmanageModel.getProductbyId(data.insertId, (err, data) => {
                                if (err) {
                                    return res.status(500).json({ success: false, message: 'Lỗi truy vấn' });
                                }
                                console.log(data)
                                return res.status(201).json({
                                    message: "Tao thanh cong",
                                    data
                                })
                            })
                        }
                    })
                }
                else {
                    res.json({ success: false, message: 'Sản phẩm đã tồn tại trong cơ sở dữ liệu' });
                }

            }
        })
    }
    edit(req, res) {
        const Id = req.params.id;
        ProductmanageModel.getProductbyId(Id, (err, data_id) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
            }
            else {
                ProductmanageModel.getAllProduct((err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err);
                    }
                    else {
                        if (err) {
                            console.log('Lỗi truy vấn', err);
                        }
                        else {
                            res.render('Product_manage', { data: data_id[0], data });
                        }
                    }
                })

            }
        })
    }
    update(req, res) {
        const product_id = req.params.id
        ProductmanageModel.findProductUpdate(product_id, req.body, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi try vấn"
                })
            }
            if (data.length === 0) {
                const updatedData = {
                    IsActive: Number(req.body.IsActive),
                    Avatar: req.file ? req.file.path : req.body.Avatar,
                    ...req.body
                };
                ProductmanageModel.updateProduct(product_id, updatedData, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Lỗi try vấn"
                        })
                    } else {
                        return res.status(203).json({
                            message: "Câp nhật thành công"
                        })
                    }
                });
            } else {
                return res.status(400).json({
                    message: "Sản phẩm đã tồn tại"
                })
            }
        })
    }
    // duyet san pham
    updateStatus(req, res) {
        const productId = req.params.id
        ProductmanageModel.updateStatusProduct(productId, req.body, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi try vấn"
                })
            }
            return res.status(203).json({
                message: "Cập nhật trạng thái thành công"
            })
        })
    }
    // xoa vao thung rac
    deleteToTrash(req, res, next) {
        const product_id = req.params.id
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ProductmanageModel.deleteToTrashProduct(product_id, User[0]._id, (err, results) => {
                    if (err) {
                        console.log('Lỗi truy vấn:', err);
                        return res.status(500).send('Internal Server Error');
                    } else {
                        return res.status(204).send('Xoa thanh cong!');
                    }
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
    // khoi phuc
    revert(req, res, next) {
        const product_id = req.params.id
        ProductmanageModel.revertProduct(product_id, (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn:', err);
                res.status(500).send('Internal Server Error');
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).send(' not found');
                } else {
                    res.redirect('back')
                }
            }
        })
    }
    // xoa vinh vien
    delete(req, res, next) {
        const product_id = req.params.id
        ProductmanageModel.destroyProduct(product_id, (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn:', err);
                return res.status(500).send('Internal Server Error');
            } else {
                if (results.affectedRows === 0) {
                    return res.status(404).send(' not found');
                } else {
                    return res.status(203).json({
                        message: "Xóa thành công"
                    })
                }
            }
        })
    }
}

module.exports = new ProductmanageController();
