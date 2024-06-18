const express = require('express');
const router = express.Router();
const ReviewYearController = require('../app/controllers/yearreview/ReviewYearController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Year'), ReviewYearController.index)
router.post("/add", CheckController.checkout('Year'), upload.single(), ReviewYearController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Year'), ReviewYearController.getAllYearFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Year'), ReviewYearController.removeToTrash)
// remove to trashAll
router.post("/removeToTrashAll", CheckController.checkout('Year'), ReviewYearController.removeToTrashAll)
// delete
router.delete("/remove/:id", CheckController.checkout('Year'), ReviewYearController.remove)
// deleteAll
router.post("/removeAll", CheckController.checkout('Year'), ReviewYearController.removeAll)
// revert
router.patch("/revert/:id", CheckController.checkout('Year'), ReviewYearController.revert)
// revertAll
router.post("/revertAll", CheckController.checkout('Year'), ReviewYearController.revertAll)
// update
router.post("/update/:id", CheckController.checkout('Year'), upload.single(), ReviewYearController.update)
module.exports = router