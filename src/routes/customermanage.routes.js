const express = require('express');
const router = express.Router();
const CustomermanageController = require('../app/controllers/customer/CustomermanageController');
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
router.get('/trash', CheckController.checkout('Customer'), CustomermanageController.getAllTrash);
// xoa vinh vien
router.delete('/trash/:id', CheckController.checkout('Customer'), CustomermanageController.deleteForever);
// khoi phuc
router.patch('/trash/:id/update', CheckController.checkout('Customer'), CustomermanageController.revertCustomer);
// khoi phuc nhieu
router.post('/revertAll', CheckController.checkout('Customer'), CustomermanageController.revertCustomerAll);
// trash
router.post('/create', CheckController.checkout('Customer'), CustomermanageController.create);
router.delete('/:id', CheckController.checkout('Customer'), CustomermanageController.delete);
router.post('/removeAll', CheckController.checkout('Customer'), CustomermanageController.deleteAll);
router.post('/:id/update', CheckController.checkout('Customer'), CustomermanageController.update);
router.get('/:id/edit', CheckController.checkout('Customer'), CustomermanageController.getbyId);
router.use('/', CheckController.checkout('Customer'), CustomermanageController.index);
module.exports = router;