const express = require('express');
const router = express.Router();
const ProductGroupController = require('../app/controllers/productgroup/ProductGroupController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Category'), ProductGroupController.index)
router.post("/add", CheckController.checkout('Category'), upload.single(), ProductGroupController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Category'), ProductGroupController.getAllProductGroupFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Category'), ProductGroupController.removeToTrash)
// delete
router.delete("/remove/:id", CheckController.checkout('Category'), ProductGroupController.remove)
// revert
router.patch("/revert/:id", CheckController.checkout('Category'), ProductGroupController.revert)
// update
router.post("/update/:id", CheckController.checkout('Category'), upload.single(), ProductGroupController.update)

module.exports = router;