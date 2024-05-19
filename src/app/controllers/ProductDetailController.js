const ProductDetailModel = require("../models/ProductDetailModel")

class ProductDetailController {
    getAll(req, res) {
        ProductDetailModel.getAllProductDetail((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                return res.status(200).json(data)
            }
        })
    }
    getProductLitmit(req, res) {
        ProductDetailModel.getAllProductDetailLimit((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                return res.status(200).json(data)
            }
        })
    }
    getOne(req, res) {
        const id = req.params.id
        ProductDetailModel.getProductDetailByProductId(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                return res.status(200).json(data)
            }
        })
    }
    create(req, res) {
        ProductDetailModel.createProductDetail({
            ProductDetail_Name: req.body.ProductDetail_Name,
            Product_id: req.body.Product_id
        }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                ProductDetailModel.getProductDetailById(data.insertId, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Loi truy van"
                        })
                    }
                    return res.status(201).json({
                        message: "Tao thanh cong",
                        data
                    })
                })
            }
        })
    }
    getProductDetailByProductId(req, res) {
        const productId = req.params.id
        ProductDetailModel.getProductDetailByProductId(productId, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Loi truy van"
                })
            }
            return res.status(200).json(data)
        })
    }
}

module.exports = new ProductDetailController