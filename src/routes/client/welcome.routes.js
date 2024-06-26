const express = require('express');
const WelcomeController = require('../../app/controllers/clients/WelcomeController');
const ScoreFileController = require('../../app/controllers/clients/ScoreFileController');
const router = express.Router();

router.get("/welcome", WelcomeController.index)
// router.get("/", WelcomeController.index)



module.exports = router