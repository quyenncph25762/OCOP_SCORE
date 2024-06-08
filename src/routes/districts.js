const express = require('express');
const router = express.Router();
const DistrictController = require('../app/controllers/DistrictController');

router.get("/", DistrictController.getAll)
router.get("/byProvinceId/:id", DistrictController.getByProvinceId)
module.exports = router;