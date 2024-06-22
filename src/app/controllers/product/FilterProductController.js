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
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                ProductmanageModel.getAllProduct(User[0].DistrictId, (err, data) => {
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
                                    res.render('filterProduct/filterProduct', { User: User[0], Product: data, Customer: Customer, ProductGroup: ProductGroup, Review: Review });
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