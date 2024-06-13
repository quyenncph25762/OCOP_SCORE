const express = require('express');
const router = express.Router();
const FilterProductController = require('../app/controllers/product/FilterProductController');
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Product'), FilterProductController.index)
module.exports = router;