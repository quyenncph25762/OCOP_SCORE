const express = require('express');
const router = express.Router();
const CustomermanageController = require('../app/controllers/customer/CustomermanageController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
router.get('/trash', CheckController.checkout, CustomermanageController.getAllTrash);
// xoa vinh vien
router.delete('/trash/:id', CustomermanageController.deleteForever);
// khoi phuc
router.patch('/trash/:id/update', CustomermanageController.revertCustomer);
// trash
router.post('/create', upload.single(), CustomermanageController.create);
router.delete('/:id', CustomermanageController.delete);
router.post('/:id/update', upload.single(), CustomermanageController.update);
router.get('/:id/edit', CustomermanageController.getbyId);
router.use('/', CheckController.checkout, CustomermanageController.index);
module.exports = router;