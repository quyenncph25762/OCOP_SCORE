const express = require('express');
const ScoreFileController = require('../app/controllers/clients/ScoreFileController');
const router = express.Router();

// scoreFile
router.get("/", ScoreFileController.index)
// getByStatus = 0
router.get("/getScoreByStatus", ScoreFileController.getScoreByStatus)
// updatePage
router.get("/createScoreFile", ScoreFileController.updatePage)
// update
router.patch("/updateScoreCommittOnScoreFile/:id", ScoreFileController.updateScoreCommittee)
// add
router.post("/add", ScoreFileController.createScoreFile)
// scoreFileDetail
router.get("/scoreFileDetail", ScoreFileController.index)
module.exports = router;