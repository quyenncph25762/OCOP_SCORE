const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
// router.use('/search', siteController.search);
router.get('/', siteController.home);

module.exports = router;