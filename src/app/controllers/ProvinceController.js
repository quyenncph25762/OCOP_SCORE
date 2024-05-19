const ProductVinceModel = require("../models/Province")

class ProvinceController {
    getAll(req, res) {
        ProductVinceModel.getAllProvince((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            } else {
                res.send(data)
            }
        })
    }
}

module.exports = new ProvinceController