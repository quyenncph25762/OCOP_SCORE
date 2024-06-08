const express = require('express');
const ScoreFileDetailController = require('../app/controllers/clients/ScoreFileDetailController');
const router = express.Router();

// scoreFileDetail
router.get("/byScoreFile/:id", ScoreFileDetailController.getByScoreFileId)
// get scorefiledetail da cham diem theo scorefile
router.get("/IsScoreByScoreFile/:id", ScoreFileDetailController.getIsScoreByScoreFile)
// add
router.post("/add", ScoreFileDetailController.createScoreFileDetail)
// update
// router.patch("/update/:id", ScoreFileDetailController.updateScoreFileDetail)
// updateScoreById
router.patch("/updateScoreById/:id", ScoreFileDetailController.updateScoreById)


module.exports = router;