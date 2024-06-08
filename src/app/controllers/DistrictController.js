const DistrictModel = require("../models/District")

class DistrictController {
    getAll(req, res) {
        DistrictModel.getAllDistrict((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            }
            return res.status(200).json(data)
        })
    }
    getByProvinceId(req, res) {
        const idProvince = req.params.id
        DistrictModel.getDistrictByProvince(idProvince, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "loi truy van"
                })
            }
            return res.status(200).json(data)
        })
    }
}

module.exports = new DistrictController