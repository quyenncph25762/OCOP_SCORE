const express = require('express');
const router = express.Router();
const FilterProductController = require('../app/controllers/product/FilterProductController');

router.get("/", FilterProductController.index)
module.exports = router;