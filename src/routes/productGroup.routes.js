const express = require('express');
const router = express.Router();
const ProductGroupController = require('../app/controllers/productgroup/ProductGroupController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Product'), ProductGroupController.index)
router.post("/add", CheckController.checkout('Product'), upload.single(), ProductGroupController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Product'), ProductGroupController.getAllProductGroupFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Product'), ProductGroupController.removeToTrash)
// delete
router.delete("/remove/:id", CheckController.checkout('Product'), ProductGroupController.remove)
// revert
router.patch("/revert/:id", CheckController.checkout('Product'), ProductGroupController.revert)
// update
router.post("/update/:id", CheckController.checkout('Product'), upload.single(), ProductGroupController.update)

module.exports = router;