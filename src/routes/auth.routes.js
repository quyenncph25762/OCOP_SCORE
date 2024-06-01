const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/auth/AuthController');
// pageLogin
router.get("/loginPage", AuthController.loginPage)
// login dang nhap
router.post("/login", AuthController.login)
// dang ki
router.get("/register", AuthController.register)
// quen mat khau
router.get("/password/reset", AuthController.resetPassword)
router.post("/password/email", AuthController.sendResetLinkEmail)
router.get("/password/reset/:email", AuthController.showResetForm)
router.post("/password/reset", AuthController.reset)
// lay 1 tai khoan
router.get("/get/:id", AuthController.getOneUser)
// tim 1 tai khoan
router.post("/findUserById/:id", AuthController.findUser)
// doi mat khau
router.patch("/changePassword/:id", AuthController.changePassword)

module.exports = router