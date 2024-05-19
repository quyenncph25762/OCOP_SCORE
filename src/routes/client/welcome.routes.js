const express = require('express');
const WelcomeController = require('../../app/controllers/clients/WelcomeController');
const router = express.Router();

router.get("/welcome", WelcomeController.index)
module.exports = router