const express = require('express');
const AuthController = require('../app/controllers/AuthController');
const router = express.Router();

router.get("/login", AuthController.login)
router.get("/register", AuthController.register)
router.get("/resetPassword", AuthController.resetPassword)
module.exports = router