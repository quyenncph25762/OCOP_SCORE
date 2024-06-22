const AccountModel = require("../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const StatisticalCustomerModel = require("../models/statistical/District/StatisticalCustomer");
const StatisticalProductByDistrictModel = require("../models/statistical/District/StatisticalProduct");
const YearReviewModel = require("../models/yearreview/YearReviewModel")
dotenv.config();
const { SECRET_CODE } = process.env
class SiteController {
    // [GET] /

    home(req, res) {
        // Hàm tính phần trăm của product
        const percentProduct = (countRankOcop, countAllProduct) => {
            const percentNumber = ((countRankOcop / countAllProduct) * 100)
            if (percentNumber > 0) {
                return percentNumber.toFixed(1)
            } else {
                return 0
            }
        }
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                // Đếm số lượng chủ thể
                const CountCustomer = await StatisticalCustomerModel.quantityCustomer(User[0].DistrictId)
                // Đếm số lượng sản phẩm theo huyện
                const countAllProduct = await StatisticalProductByDistrictModel.countAllProductByDistrict(User[0]?.DistrictId)
                // Sản phẩm 3 sao
                const countRankOcop3sao = await StatisticalProductByDistrictModel.countRankOcopThreeStar(User[0]?.DistrictId)
                // Sản phẩm 4 sao
                const countRankOcop4sao = await StatisticalProductByDistrictModel.countRankOcopFourStar(User[0]?.DistrictId)
                // Sản phẩm 5 sao
                const countRankOcop5sao = await StatisticalProductByDistrictModel.countRankOcopFiveStar(User[0]?.DistrictId)
                // Tính phần trăm số lượng sản phẩm sao trên tổng số lượng sản phẩm
                const RankOcop3SaoPercent = percentProduct(countRankOcop3sao, countAllProduct)
                const RankOcop4SaoPercent = percentProduct(countRankOcop4sao, countAllProduct)
                const RankOcop5SaoPercent = percentProduct(countRankOcop5sao, countAllProduct)
                // Tính tổng số product theo huyện
                const productByDistrict = await StatisticalProductByDistrictModel.countAllProduct()
                const getProductOcopByDistrict = await StatisticalProductByDistrictModel.getProductOcopByDistrict()

                // Tính tỉ lê sản phẩm ocop theo vùng
                const rateProductOcopByDistrict = []
                getProductOcopByDistrict.forEach((element) => {
                    const { DistrictId, DistrictName, ProductOcop, TotalProduct } = element
                    const percentProductByDistrict = percentProduct(ProductOcop, TotalProduct)
                    const newObject = {
                        DistrictId: DistrictId,
                        DistrictName: DistrictName,
                        ProductOcop: ProductOcop,
                        TotalProduct: TotalProduct,
                        percentProductByDistrict: Number(percentProductByDistrict)
                    }
                    rateProductOcopByDistrict.push(newObject)
                });
                YearReviewModel.fetchAllReviewYear((err, YearReview) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    res.render('home', { User: User[0], CountCustomer: CountCustomer, countAllProduct: countAllProduct, countRankOcop3sao: countRankOcop3sao, countRankOcop4sao: countRankOcop4sao, countRankOcop5sao: countRankOcop5sao, RankOcop3SaoPercent: RankOcop3SaoPercent, RankOcop4SaoPercent: RankOcop4SaoPercent, RankOcop5SaoPercent: RankOcop5SaoPercent, productByDistrict: productByDistrict, rateProductOcopByDistrict: rateProductOcopByDistrict, YearReview: YearReview });
                })
            })

        } else {

            res.redirect("/auth/loginPage")
        }
    }
    percentProductByDistrict = async (req, res) => {
        const percentProduct = (countRankOcop, countAllProduct) => {
            const percentNumber = ((countRankOcop / countAllProduct) * 100)
            if (percentNumber > 0) {
                return percentNumber.toFixed(1)
            } else {
                return 0
            }
        }
        const rateProductOcopByDistrict = []
        const getProductOcopByDistrict = await StatisticalProductByDistrictModel.getProductOcopByDistrict()
        getProductOcopByDistrict.forEach((element) => {
            const { DistrictId, DistrictName, ProductOcop, TotalProduct } = element
            const percentProductByDistrict = percentProduct(ProductOcop, TotalProduct)
            const newObject = {
                DistrictId: DistrictId,
                DistrictName: DistrictName,
                ProductOcop: ProductOcop,
                TotalProduct: TotalProduct,
                percentProductByDistrict: Number(percentProductByDistrict)
            }
            rateProductOcopByDistrict.push(newObject)
        });
        return res.status(200).json(rateProductOcopByDistrict ? rateProductOcopByDistrict : [])
    }
    productOcopByYearAndDistrictId = async (req, res) => {
        const idYear = req.params.year
        const idDistrict = req.params.districtId
        const listProductOcopByYear = await StatisticalProductByDistrictModel.getProductOcopByYear(idYear, idDistrict)
        return res.status(200).json(listProductOcopByYear)
    }

    // [GET] /search
    // search(req, res) {
    //     res.render('search');
    // }
}

module.exports = new SiteController();
