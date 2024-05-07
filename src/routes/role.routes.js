const express = require('express');
const router = express.Router();
const RoleController = require('../app/controllers/RoleController');

router.get("/", RoleController.index)
router.post("/add", RoleController.create)
// fetchAll trash
router.get("/trash", RoleController.getAllRoleFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", RoleController.removeToTrash)
// delete
router.delete("/remove/:id", RoleController.remove)
// revert
router.patch("/revert/:id", RoleController.revert)
// update
router.post("/update/:id", RoleController.update)

module.exports = router;