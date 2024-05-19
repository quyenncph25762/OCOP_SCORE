const express = require('express');
const DistrictController = require('../app/controllers/DistrictController');
const router = express.Router();

router.get("/", DistrictController.getAll)
router.get("/byProvinceId/:id", DistrictController.getByProvinceId)
module.exports = router;