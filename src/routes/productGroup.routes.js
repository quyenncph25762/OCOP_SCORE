const express = require('express');
const router = express.Router();
const ProductGroupController = require('../app/controllers/ProductGroupController');

router.get("/", ProductGroupController.index)
router.post("/add", ProductGroupController.create)
// fetchAll trash
router.get("/trash", ProductGroupController.getAllProductGroupFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", ProductGroupController.removeToTrash)
// delete
router.delete("/remove/:id", ProductGroupController.remove)
// revert
router.patch("/revert/:id", ProductGroupController.revert)
// update
router.post("/update/:id", ProductGroupController.update)

module.exports = router;