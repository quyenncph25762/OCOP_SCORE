const express = require('express');
const router = express.Router();
const workPositionController = require('../app/controllers/workposition/WorkPositionController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Structure'), CheckController.checkout('Structure'), workPositionController.index)
router.post("/add", CheckController.checkout('Structure'), workPositionController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Structure'), workPositionController.getAllWorkPositionModelFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Structure'), workPositionController.removeToTrash)
// remove to trash All
router.post("/removeToTrashAll", CheckController.checkout('Structure'), workPositionController.removeToTrashAll)
// delete
router.delete("/remove/:id", CheckController.checkout('Structure'), workPositionController.remove)
// delete All
router.post("/removeAll", CheckController.checkout('Structure'), workPositionController.removeAll)
// revert
router.patch("/revert/:id", CheckController.checkout('Structure'), workPositionController.revert)
// revert All
router.post("/revertAll", CheckController.checkout('Structure'), workPositionController.revertAll)
// update
router.patch("/update/:id", CheckController.checkout('Structure'), workPositionController.update)

module.exports = router;