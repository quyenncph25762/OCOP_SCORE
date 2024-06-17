const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const CheckController = require("../app/Middleware/checkoutToken")
//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
// router.use('/search', siteController.search);


router.get('/', CheckController.checkout('Dashboard'), siteController.home);
router.get("/percentProductByDistrict", CheckController.checkout('Dashboard'), siteController.percentProductByDistrict)
router.get("/productOcopByYearAndDistrictId/:year/:districtId", siteController.productOcopByYearAndDistrictId)
module.exports = router;