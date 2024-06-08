const WardModel = require("../models/Wards")

class WardController {
    getAll(req, res) {
        WardModel.getAllWard((err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "loi truy van"
                })
            }
            return res.status(200).json(data)
        })
    }
    getByDistrictId(req, res) {
        const idDistrict = req.params.id
        console.log(idDistrict)
        WardModel.getWardByDistrict(idDistrict, (err, data) => {
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

module.exports = new WardController