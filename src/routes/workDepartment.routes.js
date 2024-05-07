const express = require('express');
const WorkDepartmentController = require('../app/controllers/WorkDepartmentController');
const router = express.Router();

router.get("/", WorkDepartmentController.index)
router.post("/add", WorkDepartmentController.create)
// fetchAll trash
router.get("/trash", WorkDepartmentController.getAllWorkDepartmentFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", WorkDepartmentController.removeToTrash)
// delete
router.delete("/remove/:id", WorkDepartmentController.remove)
// revert
router.patch("/revert/:id", WorkDepartmentController.revert)
// update
router.post("/update/:id", WorkDepartmentController.update)

module.exports = router