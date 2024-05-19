const DistrictModel = require("../models/District")

class DistrictController {
    getAll(req, res) {
        DistrictModel.getAllDistrict((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            } else {
                return res.send(data)
            }
        })
    }
    getByProvinceId(req, res) {
        const idProvince = req.body.City_id
        DistrictModel.getDistrictByProvince(idProvince, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            } else {
                return res.send(data)
            }
        })
    }
}

module.exports = new DistrictController