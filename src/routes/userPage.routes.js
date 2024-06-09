const express = require('express');
const UserPageController = require('../app/controllers/UserPageController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/", CheckController.checkout, UserPageController.index)
router.post("/add", upload.single("Avatar"), UserPageController.create)
router.patch("/update/:id", upload.single("Avatar"), UserPageController.update)
router.get("/trashPage", CheckController.checkout, UserPageController.trash)
// Khoa tai khoan
router.patch("/lockUserById/:id", CheckController.checkout, UserPageController.lock)
module.exports = router;