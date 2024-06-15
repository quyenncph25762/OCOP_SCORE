const express = require('express');
const router = express.Router();
const uploadCloud = require("../config/cloudinary/cloudinary")
const productmanageController = require('../app/controllers/product/ProductmanageController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
// update RankOcop
router.patch("/updateRankOcop/:id", CheckController.checkout('Product'), productmanageController.updateRankOcop)
// update status product
router.patch("/updateStatus/:id", CheckController.checkout('Product'), productmanageController.updateStatus)
// khoi phuc
router.patch("/revert/:id", CheckController.checkout('Product'), productmanageController.revert)
// khoi phuc
router.post("/revertAll", CheckController.checkout('Product'), productmanageController.revertAll)
// xoa vao thung rac
router.delete("/removeToTrash/:id", CheckController.checkout('Product'), productmanageController.deleteToTrash)
// xoa vao thung rac nhieu
router.post("/removeToTrashAll", CheckController.checkout('Product'), productmanageController.deleteToTrashAll)
// fetAllTrash
router.get("/trash", CheckController.checkout('Product'), productmanageController.productTrash)
// trash
router.post('/create', CheckController.checkout('Product'), upload.single("Avatar"), productmanageController.create);

// Xoa 1
router.delete('/remove/:id', CheckController.checkout('Product'), productmanageController.delete);
// Xoa nhieu
router.post('/removeAll', CheckController.checkout('Product'), productmanageController.deleteAll);


router.patch('/:id/update', CheckController.checkout('Product'), upload.single("Avatar"), productmanageController.update);
router.get('/:id/edit', CheckController.checkout('Product'), productmanageController.getbyId);
router.use('/', CheckController.checkout('Product'), productmanageController.index);
module.exports = router;