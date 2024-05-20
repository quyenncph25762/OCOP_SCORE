const express = require('express');
const WelcomeController = require('../../app/controllers/clients/WelcomeController');
const ScoreFileController = require('../../app/controllers/clients/ScoreFileController');
const router = express.Router();

router.get("/welcome", WelcomeController.index)
router.get("/", WelcomeController.index)

// scoreFile
router.get("/scoreFile", ScoreFileController.index)
router.get("/scoreFileUpdatePage/:id", ScoreFileController.update)

// scoreFileDetail
router.get("/scoreFileDetail", ScoreFileController.index)
module.exports = router