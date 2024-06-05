const express = require('express');
const router = express.Router();
const ScoreFileController = require('../app/controllers/clients/ScoreFileController');

// scoreFile
router.get("/", ScoreFileController.index)
// scoreFile From Trash
router.get("/trash", ScoreFileController.getAllFromTrash)
// getScoreFileByScoreCommitee
router.get("/byIdScoreCommittee/:id", ScoreFileController.getScoreFileByScoreCommittee)
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
// removeToTrash
router.patch("/removeToTrash/:id", ScoreFileController.removeToTrash)
// removeForever
router.delete("/remove/:id", ScoreFileController.removeForever)
// revert
router.patch("/revert/:id", ScoreFileController.revert)


module.exports = router;
