const express = require('express');
const router = express.Router();
const RoleController = require('../app/controllers/role/RoleController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")

router.get("/", CheckController.checkout('Manage'), RoleController.index)
router.post("/add", CheckController.checkout('Manage'), upload.single(), RoleController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Manage'), RoleController.getAllRoleFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Manage'), RoleController.removeToTrash)
// delete
router.delete("/remove/:id", CheckController.checkout('Manage'), RoleController.remove)
// revert
router.patch("/revert/:id", CheckController.checkout('Manage'), RoleController.revert)
// update
router.post("/update/:id", CheckController.checkout('Manage'), upload.single(), RoleController.update)

router.get("/:id/permission", CheckController.checkout('Manage'), RoleController.permission)
module.exports = router;