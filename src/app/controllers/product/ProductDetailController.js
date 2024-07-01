const ProductDetailModel = require("../../models/product/ProductDetailModel")

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
    // getById
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
    // GetByCode and productId
    getOneByCode(req, res) {
        const code = req.params.code
        const productId = req.params.productId
        ProductDetailModel.getProductDetailByCode(code, productId, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Loi truy van"
                })
            } else {
                return res.status(200).json(data[0])
            }
        })
    }
    create = async (req, res) => {
        const resultsArray = [];
        if (req.body) {
            for (const productDetail of req.body) {
                const results = await ProductDetailModel.createProductDetail(productDetail)
                const resultData = await new Promise((resolve, reject) => {
                    ProductDetailModel.getProductDetailById(results?.insertId, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data[0]);
                        }
                    });
                });
                resultsArray.push(resultData);
            }
            return res.status(201).json({
                message: "Tao thanh cong",
                resultsArray
            })
        }
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