const express = require('express');
const ScoreCommitteeDetailController = require('../app/controllers/ScoreCommitteeDetailController');
const router = express.Router();

router.get("/getByScoreCommittee/:id", ScoreCommitteeDetailController.getByScoreCommitteeId)
router.post("/add", ScoreCommitteeDetailController.create)
router.put("/update/:id", ScoreCommitteeDetailController.update)
router.delete("/delete/:id", ScoreCommitteeDetailController.delete)

module.exports = router;