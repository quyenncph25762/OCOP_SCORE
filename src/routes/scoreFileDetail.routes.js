const express = require('express');
const ScoreFileDetailController = require('../app/controllers/clients/ScoreFileDetailController');
const router = express.Router();
const CheckController = require("../app/Middleware/checkoutToken")
// scoreFileDetail
router.get("/byScoreFile/:id",CheckController.checkout('Score'), ScoreFileDetailController.getByScoreFileId)
// get scorefiledetail da cham diem theo scorefile
router.get("/IsScoreByScoreFile/:id",CheckController.checkout('Score'), ScoreFileDetailController.getIsScoreByScoreFile)
// add
router.post("/add",CheckController.checkout('Score'), ScoreFileDetailController.createScoreFileDetail)
// update
// router.patch("/update/:id", ScoreFileDetailController.updateScoreFileDetail)
// updateScoreById
router.patch("/updateScoreById/:id",CheckController.checkout('Score'), ScoreFileDetailController.updateScoreById)


module.exports = router;