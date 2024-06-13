const express = require('express');
const WorkDepartmentController = require('../app/controllers/workdepartment/WorkDepartmentController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Structure'), WorkDepartmentController.index)
router.post("/add", CheckController.checkout('Structure'), upload.single(), WorkDepartmentController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Structure'), WorkDepartmentController.getAllWorkDepartmentFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Structure'), WorkDepartmentController.removeToTrash)
// delete
router.delete("/remove/:id", CheckController.checkout('Structure'), WorkDepartmentController.remove)
// revert
router.patch("/revert/:id", CheckController.checkout('Structure'), WorkDepartmentController.revert)
// update
router.post("/update/:id", CheckController.checkout('Structure'), upload.single(), WorkDepartmentController.update)

module.exports = router