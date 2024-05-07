const express = require('express');
const router = express.Router();
const ReviewYearController = require('../app/controllers/ReviewYearController');

router.get("/", ReviewYearController.index)
router.post("/add", ReviewYearController.create)
// fetchAll trash
router.get("/trash", ReviewYearController.getAllYearFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", ReviewYearController.removeToTrash)
// delete
router.delete("/remove/:id", ReviewYearController.remove)
// revert
router.patch("/revert/:id", ReviewYearController.revert)
// update
router.post("/update/:id", ReviewYearController.update)
module.exports = router