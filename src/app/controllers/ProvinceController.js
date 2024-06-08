const ProductVinceModel = require("../models/Province")

class ProvinceController {
    getAll(req, res) {
        ProductVinceModel.getAllProvince((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            }
            return res.status(200).json(data)
        })
    }
}

module.exports = new ProvinceController