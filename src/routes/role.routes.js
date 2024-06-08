const express = require('express');
const router = express.Router();
const RoleController = require('../app/controllers/role/RoleController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")

router.get("/", CheckController.checkout, RoleController.index)
router.post("/add", CheckController.checkout, upload.single(), RoleController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout, RoleController.getAllRoleFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", RoleController.removeToTrash)
// delete
router.delete("/remove/:id", RoleController.remove)
// revert
router.patch("/revert/:id", RoleController.revert)
// update
router.post("/update/:id", upload.single(), RoleController.update)

module.exports = router;