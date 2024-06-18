const express = require('express');
const router = express.Router();
const ProductGroupController = require('../app/controllers/productgroup/ProductGroupController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout('Category'), ProductGroupController.index)
router.post("/add", CheckController.checkout('Category'), ProductGroupController.create)
// fetchAll trash
router.get("/trash", CheckController.checkout('Category'), ProductGroupController.getAllProductGroupFromTrash)
// remove to trash
router.delete("/removeToTrash/:id", CheckController.checkout('Category'), ProductGroupController.removeToTrash)
// remove to trashAll
router.post("/removeToTrashAll", CheckController.checkout('Category'), ProductGroupController.removeToTrashAll)
// delete
router.delete("/remove/:id", CheckController.checkout('Category'), ProductGroupController.remove)
// deleteAll
router.post("/removeAll", CheckController.checkout('Category'), ProductGroupController.removeAll)
// revert
router.patch("/revert/:id", CheckController.checkout('Category'), ProductGroupController.revert)
// revertAll
router.post("/revertAll", CheckController.checkout('Category'), ProductGroupController.revertAll)
// update
router.post("/update/:id", CheckController.checkout('Category'), ProductGroupController.update)

module.exports = router;