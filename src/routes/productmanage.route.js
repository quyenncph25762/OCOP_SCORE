const express = require('express');
const router = express.Router();
const uploadCloud = require("../config/cloudinary/cloudinary")
const productmanageController = require('../app/controllers/ProductmanageController');
const upload = require("../app/Middleware/uploadMiddle")
//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
// khoi phuc
router.patch("/revert/:id", productmanageController.revert)
// xoa vao thung rac
router.delete("/removeToTrash/:id", productmanageController.deleteToTrash)
// fetAllTrash
router.get("/trash", productmanageController.productTrash)
// trash
router.post('/create', upload.single("Avatar"), productmanageController.create);
router.delete('/remove/:id', productmanageController.delete);
router.post('/:id/update', upload.single("Avatar"), productmanageController.update);
router.get('/:id/edit', productmanageController.getbyId);
router.use('/', productmanageController.index);
module.exports = router;