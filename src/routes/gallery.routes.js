const express = require('express');
const router = express.Router();
const GalleryController = require('../app/controllers/GalleryController');
const upload = require("../app/Middleware/uploadMiddle")
router.get("/", GalleryController.getAll)
router.post("/add", upload.array("imgUrl"), GalleryController.create)
router.post("/delete", GalleryController.delete)
router.get("/productDetail/:id", GalleryController.getGalleryByProDetail)
module.exports = router;