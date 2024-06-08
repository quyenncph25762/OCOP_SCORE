const express = require('express');
const router = express.Router();
const workPositionController = require('../app/controllers/workposition/WorkPositionController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout, workPositionController.index)
router.post("/add", upload.single(), workPositionController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout, workPositionController.getAllWorkPositionModelFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", workPositionController.removeToTrash)
// delete
router.delete("/remove/:id", workPositionController.remove)
// revert
router.patch("/revert/:id", workPositionController.revert)
// update
router.post("/update/:id", upload.single(), workPositionController.update)

module.exports = router;