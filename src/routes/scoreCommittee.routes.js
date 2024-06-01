const express = require('express');
const ScoreCommitteeController = require("../app/controllers/scorecommittee/ScoreCommitteeController")
const router = express.Router();

router.get("/", ScoreCommitteeController.index)
// add
router.post("/add", ScoreCommitteeController.create)
// update
router.patch("/update/:id", ScoreCommitteeController.update)
// trang thung rac
router.get("/trashPage", ScoreCommitteeController.trashPage)
// remove vao thung rac
router.patch("/removeTrash/:id", ScoreCommitteeController.removeToTrash)
// Khoi phuc
router.patch("/revert/:id", ScoreCommitteeController.revert)


module.exports = router;