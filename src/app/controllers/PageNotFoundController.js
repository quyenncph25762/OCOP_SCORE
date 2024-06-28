class PageNotFoundController {
    index(req, res) {
        res.render("PageNotFound/PageNotFound")
    }
}

module.exports = new PageNotFoundController()