const express = require('express');
const ProvinceController = require('../app/controllers/ProvinceController');
const router = express.Router();

router.get("/", ProvinceController.getAll)
module.exports = router;