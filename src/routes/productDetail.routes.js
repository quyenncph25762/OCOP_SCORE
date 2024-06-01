const express = require('express');
const router = express.Router();
const uploadCloud = require("../config/cloudinary/cloudinary");
const ProductDetailController = require('../app/controllers/product/ProductDetailController');
const upload = require("../app/Middleware/uploadMiddle")
router.post('/create', upload.array("AttachFile"), ProductDetailController.create);
router.get('/', ProductDetailController.getAll);
router.get('/limit', ProductDetailController.getProductLitmit);
router.get('/:id', ProductDetailController.getOne);
router.get('/byCode/:code/:productId', ProductDetailController.getOneByCode);
router.get('/productDetailByProduct/:id', ProductDetailController.getProductDetailByProductId);

module.exports = router;