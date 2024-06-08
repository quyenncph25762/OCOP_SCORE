const express = require('express');
const router = express.Router();
const EmployeeController = require('../app/controllers/employee/EmployeeController');
const uploadCloud = require("../config/cloudinary/cloudinary")
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")

router.get("/", CheckController.checkout, EmployeeController.index)
router.get("/getAll", EmployeeController.getAll)
// getAll
router.post("/add", upload.single("Avatar"), EmployeeController.create)
// fetchAll trash
router.get("/trash", EmployeeController.getAllEmployeeFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", EmployeeController.removeToTrash)
// delete
router.delete("/remove/:id", EmployeeController.remove)
// revert
router.patch("/revert/:id", EmployeeController.revert)
// update
router.post("/update/:id", upload.single("Avatar"), EmployeeController.update)
// filter employee

module.exports = router;