const express = require('express');
const router = express.Router();
const EmployeeController = require('../app/controllers/EmployeeController');

router.get("/", EmployeeController.index)
router.post("/add", EmployeeController.create)
// fetchAll trash
router.get("/trash", EmployeeController.getAllEmployeeFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", EmployeeController.removeToTrash)
// delete
router.delete("/remove/:id", EmployeeController.remove)
// revert
router.patch("/revert/:id", EmployeeController.revert)
// update
router.post("/update/:id", EmployeeController.update)

module.exports = router;