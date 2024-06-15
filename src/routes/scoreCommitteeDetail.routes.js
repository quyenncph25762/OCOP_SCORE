const express = require('express');
const ScoreCommitteeDetailController = require('../app/controllers/scorecommittee/ScoreCommitteeDetailController');
const router = express.Router();
const CheckController = require("../app/Middleware/checkoutToken")
router.get("/getByScoreCommittee/:id", ScoreCommitteeDetailController.getByScoreCommitteeId)
router.post("/add", CheckController.checkout('Committee'), ScoreCommitteeDetailController.create)
router.patch("/update", CheckController.checkout('Committee'), ScoreCommitteeDetailController.update)
router.post("/delete", CheckController.checkout('Committee'), ScoreCommitteeDetailController.delete)

module.exports = router;