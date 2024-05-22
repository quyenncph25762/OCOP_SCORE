const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
// pageLogin
router.get("/loginPage", AuthController.loginPage)
// login dang nhap
router.post("/login", AuthController.login)
// dang ki
router.get("/register", AuthController.register)
// quen mat khau
router.get("/resetPassword", AuthController.resetPassword)
// lay 1 tai khoan
router.get("/get/:id", AuthController.getOneUser)
// tim 1 tai khoan
router.post("/findUserById/:id", AuthController.findUser)
// doi mat khau
router.patch("/changePassword/:id", AuthController.changePassword)

module.exports = router