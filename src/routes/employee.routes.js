const express = require('express');
const router = express.Router();
const EmployeeController = require('../app/controllers/employee/EmployeeController');
const uploadCloud = require("../config/cloudinary/cloudinary")
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")

router.get("/", CheckController.checkout('Employee'), EmployeeController.index)
router.get("/getAll", CheckController.checkout('Employee'), EmployeeController.getAll)
// getAll
router.post("/add", CheckController.checkout('Employee'), upload.single("Avatar"), EmployeeController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Employee'), EmployeeController.getAllEmployeeFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Employee'), EmployeeController.removeToTrash)
// remove to trash all
router.post("/removeToTrashAll", EmployeeController.removeToTrashAll)
router.delete("/remove/:id", CheckController.checkout('Employee'), EmployeeController.remove)
// delete All
// revert
router.patch("/revert/:id", CheckController.checkout('Employee'), EmployeeController.revert)
// revertAll
router.post("/revertAll", CheckController.checkout('Employee'), EmployeeController.revertAll)
// update
router.post("/update/:id", CheckController.checkout('Employee'), upload.single("Avatar"), EmployeeController.update)
// filter employee

module.exports = router;