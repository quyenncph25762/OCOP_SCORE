const express = require('express');
const ScoreFileDetailController = require('../app/controllers/clients/ScoreFileDetailController');
const router = express.Router();

// scoreFileDetail
router.get("/byScoreFile/:id", ScoreFileDetailController.getByScoreFileId)
// add
router.post("/add", ScoreFileDetailController.createScoreFileDetail)
// update
// router.patch("/update/:id", ScoreFileDetailController.updateScoreFileDetail)
// updateScoreById
router.patch("/updateScoreById/:id", ScoreFileDetailController.updateScoreById)
module.exports = router;