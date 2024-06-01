const express = require('express');
const WorkDepartmentController = require('../app/controllers/workdepartment/WorkDepartmentController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
router.get("/", WorkDepartmentController.index)
router.post("/add", upload.single(), WorkDepartmentController.create)
// fetchAll trash
router.get("/trash", WorkDepartmentController.getAllWorkDepartmentFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", WorkDepartmentController.removeToTrash)
// delete
router.delete("/remove/:id", WorkDepartmentController.remove)
// revert
router.patch("/revert/:id", WorkDepartmentController.revert)
// update
router.post("/update/:id", upload.single(), WorkDepartmentController.update)

module.exports = router