const express = require('express');
const GalleryController = require('../app/controllers/GalleryController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
router.get("/", GalleryController.getAll)
router.post("/add", upload.single("imgUrl"), GalleryController.create)
router.delete("/delete/:id", GalleryController.delete)
router.get("/productDetail/:id", GalleryController.getGalleryByProDetail)
module.exports = router;