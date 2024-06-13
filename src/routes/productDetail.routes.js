const express = require('express');
const router = express.Router();
const uploadCloud = require("../config/cloudinary/cloudinary");
const ProductDetailController = require('../app/controllers/product/ProductDetailController');
const upload = require("../app/Middleware/uploadMiddle")

const CheckController = require("../app/Middleware/checkoutToken")
router.post('/create', CheckController.checkout('Product'), upload.array("AttachFile"), ProductDetailController.create);
router.get('/', CheckController.checkout('Product'), ProductDetailController.getAll);
router.get('/limit', CheckController.checkout('Product'), ProductDetailController.getProductLitmit);
router.get('/:id', CheckController.checkout('Product'), ProductDetailController.getOne);
router.get('/byCode/:code/:productId', CheckController.checkout('Product'), ProductDetailController.getOneByCode);
router.get('/productDetailByProduct/:id', CheckController.checkout('Product'), ProductDetailController.getProductDetailByProductId);

module.exports = router;