const express = require('express');
const WardController = require('../app/controllers/WardController');
const router = express.Router();

router.get("/", WardController.getAll)
router.get("/getByDistrict/:id", WardController.getByDistrictId)

module.exports = router;