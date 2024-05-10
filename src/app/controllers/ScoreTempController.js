const productGroupModel = require("../models/ProductGroupModel")
class ScoreTempController {
    index(req, res, next) {

        res.render("scoreTemp/scoreTemp")
    }
    add(req, res, next) {
        productGroupModel.fetchAllProductGroup((err, productGroup) => {
            console.log(productGroup)
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            res.render("scoreTemp/add", { productGroup: productGroup })
        })
    }
}

module.exports = new ScoreTempController