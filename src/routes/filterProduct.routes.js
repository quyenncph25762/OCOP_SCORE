const express = require('express');
const router = express.Router();
const FilterProductController = require('../app/controllers/product/FilterProductController');
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Search'), FilterProductController.index)
module.exports = router;