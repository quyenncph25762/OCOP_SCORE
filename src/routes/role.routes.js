const express = require('express');
const router = express.Router();
const RoleController = require('../app/controllers/role/RoleController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")

router.get("/", CheckController.checkout('Manage'), RoleController.index)
router.post("/add", upload.single(), RoleController.create)
// fetchAll trash
router.get("/trash", RoleController.getAllRoleFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", RoleController.removeToTrash)
// delete
router.delete("/remove/:id", RoleController.remove)
// revert
router.patch("/revert/:id", RoleController.revert)
// update
router.post("/update/:id", upload.single(), RoleController.update)

router.get("/:id/permission", RoleController.permission)
module.exports = router;