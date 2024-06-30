const express = require('express');
const UserPageController = require('../app/controllers/UserPageController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken");
const cacheMiddleware = require('../app/Middleware/cachaMiddleware');
router.get("/", CheckController.checkout('Manage'), UserPageController.index)
router.get("/getAllUser", UserPageController.getAll)
router.post("/add", CheckController.checkout('Manage'), upload.single("Avatar"), UserPageController.create)
router.patch("/update/:id", CheckController.checkout('Manage'), upload.single("Avatar"), UserPageController.update)
router.get("/trashPage", CheckController.checkout('Manage'), UserPageController.trash)
// Khoa tai khoan
router.patch("/lockUserById/:id", CheckController.checkout('Manage'), UserPageController.lock)
module.exports = router;