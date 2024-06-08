const express = require('express');
const router = express.Router();
const ReviewYearController = require('../app/controllers/yearreview/ReviewYearController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout, ReviewYearController.index)
router.post("/add", upload.single(), ReviewYearController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout, ReviewYearController.getAllYearFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", ReviewYearController.removeToTrash)
// delete
router.delete("/remove/:id", ReviewYearController.remove)
// revert
router.patch("/revert/:id", ReviewYearController.revert)
// update
router.post("/update/:id", upload.single(), ReviewYearController.update)
module.exports = router