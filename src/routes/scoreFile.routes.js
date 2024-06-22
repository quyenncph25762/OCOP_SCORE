const express = require('express');
const router = express.Router();
const ScoreFileController = require('../app/controllers/clients/ScoreFileController');
const CheckController = require("../app/Middleware/checkoutToken")

// scoreFile
router.get("/", CheckController.checkout('Score'), ScoreFileController.index)
// scoreFile get One
router.get("/getOne/:id", CheckController.checkout('Score'), ScoreFileController.getOneController)
// scoreFile From Trash
router.get("/trash", CheckController.checkout('Score'), ScoreFileController.getAllFromTrash)
// getScoreFileByScoreCommitee
router.get("/byIdScoreCommittee/:id", CheckController.checkout('Score'), ScoreFileController.getScoreFileByScoreCommittee)
// getScoreFileByScoreCommiteeAll
router.get("/byIdScoreCommitteeAll/:id", CheckController.checkout('Score'), ScoreFileController.getScoreFileByScoreCommitteeAll)
// getByStatus = 0
router.get("/getScoreByStatus", CheckController.checkout('Score'), ScoreFileController.getScoreByStatus)
// createPage
router.get("/createScoreFile", CheckController.checkout('Score'), ScoreFileController.createPage)
// updatePage
router.get("/updateScoreFile", CheckController.checkout('Score'), ScoreFileController.updatePage)
// updatePage
router.get("/reviewPage", CheckController.checkout('Score'), ScoreFileController.reviewPage)
// update 
router.patch("/update/:id", CheckController.checkout('Score'), ScoreFileController.update)
// update ScoreCommitt
router.patch("/updateScoreCommittOnScoreFile/:id", CheckController.checkout('Score'), ScoreFileController.updateScoreCommittee)
// update ScoreTotal
router.patch("/updateScoreTotal/:id", CheckController.checkout('Score'), ScoreFileController.updateScoreTotal)
// update ScoreTotal
router.patch("/updateStatus/:id", CheckController.checkout('Score'), ScoreFileController.updateStatusScoreFile)
// add
router.post("/add", CheckController.checkout('Score'), ScoreFileController.createScoreFile)
// remove
router.patch("/remove/:id", CheckController.checkout('Score'), ScoreFileController.removeScoreFile)
// revert
router.patch("/revert/:id", CheckController.checkout('Score'), ScoreFileController.revert)


module.exports = router;
