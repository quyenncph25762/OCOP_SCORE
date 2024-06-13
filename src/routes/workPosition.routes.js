const express = require('express');
const router = express.Router();
const workPositionController = require('../app/controllers/workposition/WorkPositionController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Structure'), CheckController.checkout('Structure'), workPositionController.index)
router.post("/add", CheckController.checkout('Structure'), upload.single(), workPositionController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Structure'), workPositionController.getAllWorkPositionModelFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Structure'), workPositionController.removeToTrash)
// delete
router.delete("/remove/:id", CheckController.checkout('Structure'), workPositionController.remove)
// revert
router.patch("/revert/:id", CheckController.checkout('Structure'), workPositionController.revert)
// update
router.post("/update/:id", CheckController.checkout('Structure'), upload.single(), workPositionController.update)

module.exports = router;