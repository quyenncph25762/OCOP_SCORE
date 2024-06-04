const express = require('express');
const router = express.Router();
const ScoreFileController = require('../app/controllers/clients/ScoreFileController');

// scoreFile
router.get("/", ScoreFileController.index)
// getByStatus = 0
router.get("/getScoreByStatus", ScoreFileController.getScoreByStatus)
// createPage
router.get("/createScoreFile", ScoreFileController.createPage)
// updatePage
router.get("/updateScoreFile", ScoreFileController.updatePage)
// update 
router.patch("/update/:id", ScoreFileController.update)
// update ScoreCommitt
router.patch("/updateScoreCommittOnScoreFile/:id", ScoreFileController.updateScoreCommittee)
// update ScoreTotal
router.patch("/updateScoreTotal/:id", ScoreFileController.updateScoreTotal)
// add
router.post("/add", ScoreFileController.createScoreFile)

module.exports = router;
