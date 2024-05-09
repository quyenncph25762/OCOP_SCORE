class ScoreTempController {
    index(req, res, next) {
        res.render("scoreTemp/scoreTemp")
    }
    add(req, res, next) {
        res.render("scoreTemp/add")
    }
}

module.exports = new ScoreTempController