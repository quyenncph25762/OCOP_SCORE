const express = require('express');
const ScoreCommitteeController = require("../app/controllers/scorecommittee/ScoreCommitteeController")
const CheckController = require("../app/Middleware/checkoutToken")
const router = express.Router();

router.get("/", CheckController.checkout, ScoreCommitteeController.index)
// add
router.post("/add", ScoreCommitteeController.create)
// update
router.patch("/update/:id", ScoreCommitteeController.update)
// update charName
router.patch("/updateCharMan/:id", ScoreCommitteeController.updateCharman)
// update isDefault
router.patch("/updateIsDefault/:id", ScoreCommitteeController.updateIsDefault)
// trang thung rac
router.get("/trashPage", CheckController.checkout, ScoreCommitteeController.trashPage)
// remove vao thung rac
router.patch("/removeTrash/:id", ScoreCommitteeController.removeToTrash)
// Khoi phuc
router.patch("/revert/:id", ScoreCommitteeController.revert)


module.exports = router;