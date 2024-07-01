const ProductmanageModel = require('../../models/product/ProductmanageModel');
const CustomerModel = require("../../models/customer/CustomermanageModel")
const ProductGroupModel = require("../../models/productgroup/ProductGroupModel")
const ReviewModel = require("../../models/yearreview/YearReviewModel")
const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class FilterProductController {
    index(req, res) {
        const cookie = req.cookies
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 10; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const productGroupFilter = req.query.productGroupFilter || ''
        const YearFilter = req.query.YearFilter || ''
    
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ProductmanageModel.getAllProductBySearch_Year_Group(YearFilter, productGroupFilter, User[0].DistrictId, (err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err)
                    }
                   
                    // lay ten chu the
                    CustomerModel.getAllCustomer(User[0]?.DistrictId, (err, Customer) => {
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
                                    const totalPages = Math.ceil(data.length / pageSize);
                                    const pages = Array.from({ length: totalPages }, (_, index) => {
                                        return {
                                            number: index + 1,
                                            active: index + 1 === page,
                                            isDots: index + 1 > 5
                                        };
                                    });
                                    const paginatedData = data.slice(startIndex, endIndex);
                                    const views = {
                                        User: User[0],
                                        YearFilter: YearFilter,
                                        productGroupFilter: productGroupFilter,
                                        Product: paginatedData,
                                        Customer: Customer,
                                        ProductGroup: ProductGroup,
                                        Review: Review,
                                        pagination: {
                                            prev: page > 1 ? page - 1 : null,
                                            next: endIndex < data.length ? page + 1 : null,
                                            pages: pages,
                                        },
                                    }
                                    res.render('filterProduct/filterProduct', views);
                                })
                            })
                        }
                    })
                })
            })
        } else {
            res.redirect("/auth/loginPage")
        }

    }
}

module.exports = new FilterProductController