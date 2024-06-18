const express = require('express');
const WorkDepartmentController = require('../app/controllers/workdepartment/WorkDepartmentController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Structure'), WorkDepartmentController.index)
router.post("/add", CheckController.checkout('Structure'), WorkDepartmentController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Structure'), WorkDepartmentController.getAllWorkDepartmentFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Structure'), WorkDepartmentController.removeToTrash)
// remove to trash All
router.post("/removeToTrashAll", CheckController.checkout('Structure'), WorkDepartmentController.removeToTrashAll)
// delete
router.delete("/remove/:id", CheckController.checkout('Structure'), WorkDepartmentController.remove)
// deleteAll
router.post("/removeAll", CheckController.checkout('Structure'), WorkDepartmentController.removeAll)
// revert
router.patch("/revert/:id", CheckController.checkout('Structure'), WorkDepartmentController.revert)
// revertAll
router.post("/revertAll", CheckController.checkout('Structure'), WorkDepartmentController.revertAll)
// update
router.patch("/update/:id", CheckController.checkout('Structure'), WorkDepartmentController.update)

module.exports = router