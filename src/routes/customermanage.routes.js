const express = require('express');
const CustomermanageController = require('../app/controllers/CustomermanageController');
const router = express.Router();

//route phải khớp từ trên xuống nên route gốc phải để dưới cùng
router.get('/trash', CustomermanageController.getAllTrash);
// xoa vinh vien
router.delete('/trash/:id', CustomermanageController.deleteForever);
// khoi phuc
router.patch('/trash/:id/update', CustomermanageController.revertCustomer);
// trash
router.post('/create', CustomermanageController.create);
router.delete('/:id', CustomermanageController.delete);
router.post('/:id/update', CustomermanageController.update);
router.get('/:id/edit', CustomermanageController.getbyId);
router.use('/', CustomermanageController.index);
module.exports = router;