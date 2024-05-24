const express = require('express');
const ScoreCommitteeDetailController = require('../app/controllers/ScoreCommitteeDetailController');
const router = express.Router();

router.get("/getByScoreCommittee/:id", ScoreCommitteeDetailController.getByScoreCommitteeId)
router.post("/add", ScoreCommitteeDetailController.create)
router.get("/update/:id", ScoreCommitteeDetailController.update)

module.exports = router;