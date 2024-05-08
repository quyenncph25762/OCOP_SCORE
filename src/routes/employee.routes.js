const express = require('express');
const router = express.Router();
const EmployeeController = require('../app/controllers/EmployeeController');
const uploadCloud = require("../config/cloudinary/cloudinary")
const upload = require("../app/Middleware/uploadMiddle")
router.get("/", EmployeeController.index)
router.post("/add", uploadCloud.single("avatar"), EmployeeController.create)
// fetchAll trash
router.get("/trash", EmployeeController.getAllEmployeeFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", EmployeeController.removeToTrash)
// delete
router.delete("/remove/:id", EmployeeController.remove)
// revert
router.patch("/revert/:id", EmployeeController.revert)
// update
router.post("/update/:id", uploadCloud.single("avatar"), EmployeeController.update)

module.exports = router;