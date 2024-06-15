const ProductmanageModel = require('../../models/product/ProductmanageModel');
const CustomerModel = require("../../models/customer/CustomermanageModel")
const ProductGroupModel = require("../../models/productgroup/ProductGroupModel")
const ReviewModel = require("../../models/yearreview/YearReviewModel")
const AccountModel = require("../../models/Account")
const ProductDetail = require("../../models/product/ProductDetailModel")
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
                if (User[0]?.DistrictId) {
                    ProductmanageModel.getAllProduct(User[0]?.DistrictId, (err, data) => {
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
                } else {
                    ProductmanageModel.getAllProductIsNull((err, data) => {
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
                }
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
                if (User[0]?.DistrictId) {
                    ProductmanageModel.getAllProductFromtTrash(User[0]?.DistrictId, (err, data) => {
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
                } else {
                    ProductmanageModel.getAllProductFromtTrashIsNull((err, data) => {
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
                }
            })
        }

    }
    // get by id
    getbyId(req, res) {
        const id = req.params.id
        ProductmanageModel.getProductbyId(id, (err, Product) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
            } else {
                return res.status(200).json(Product[0])
            }
        })
    }
    create(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
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
                    Note: req.body.Note,
                    DistrictId: User[0]?.DistrictId
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
                            return res.status(400).json({ success: false, message: 'Sản phẩm đã tồn tại trong cơ sở dữ liệu' });
                        }

                    }
                })
            })
        }

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
    // xoa vao thung rac
    deleteToTrash = async (req, res, next) => {
        try {
            const product_id = req.params.id
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    await ProductmanageModel.deleteToTrashProduct(product_id, User[0]._id)
                    return res.status(203).json({
                        message: "Xóa thành công"
                    })
                })
            } else {
                res.redirect("/auth/loginPage")
            }
        } catch (error) {
            console.log(error)
        }

    }
    // 
    deleteToTrashAll = async (req, res) => {
        try {
            if (req.body.length > 0) {

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
                            await ProductmanageModel.deleteToTrashProduct(id, User[0]._id)
                        }
                        return res.status(203).json({
                            message: "Xóa thành công"
                        })
                    })
                }
            } else {
                return res.status(500).json({
                    message: "Khong co id nao"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // xoa vinh vien
    delete = async (req, res) => {
        try {
            const product_id = req.params.id
            await ProductmanageModel.destroyProduct(product_id)
            return res.status(203).json({
                message: "Xoa thanh cong"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // xoa nhieu
    deleteAll = async (req, res) => {
        try {
            if (req.body.length > 0) {
                for (const id of req.body) {
                    await ProductmanageModel.destroyProduct(id)
                }
                return res.status(500).json({
                    message: "Xóa thành công"
                })
            } else {
                return res.status(500).json({
                    message: "Khong co id nao"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // khoi phuc
    revert = async (req, res, next) => {
        try {
            const product_id = req.params.id
            await ProductmanageModel.revertProduct(product_id)
            return res.status(205).json({
                message: "Đã khôi phục lại dữ liệu"
            })
        } catch (error) {
            console.log(error)
        }
    }
    // Khoi phuc nhieu
    revertAll = async (req, res, next) => {
        try {
            if (req.body.length > 0) {
                for (const id of req.body) {
                    await ProductmanageModel.revertProduct(id)
                }
                return res.status(205).json({
                    message: "Đã khôi phục lại dữ liệu"
                })
            } else {
                return res.status(500).json({
                    message: "Khong co id nao"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // update product
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
    // update rankOcop Product
    // update product
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
    updateRankOcop(req, res) {
        const productId = req.params.id
        console.log(req.body)
        ProductmanageModel.updateRankOcopProduct(productId, req.body, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Lỗi try vấn"
                })
            }
            return res.status(203).json({
                message: "Cập nhật thành công"
            })
        })
    }

}

module.exports = new ProductmanageController();
