const express = require('express');
const ScoreCommitteeController = require("../app/controllers/scorecommittee/ScoreCommitteeController")
const CheckController = require("../app/Middleware/checkoutToken")
const router = express.Router();

router.get("/", CheckController.checkout('Committee'), ScoreCommitteeController.index)
// getOneScoreCommitt
router.get("/getOne/:id", ScoreCommitteeController.getOne)
// add
router.post("/add", CheckController.checkout('Committee'), ScoreCommitteeController.create)
// update
router.patch("/update/:id", CheckController.checkout('Committee'), ScoreCommitteeController.update)
// update charName
router.patch("/updateCharMan/:id", CheckController.checkout('Committee'), ScoreCommitteeController.updateCharman)
// update isDefault
router.patch("/updateIsDefault/:id", CheckController.checkout('Committee'), ScoreCommitteeController.updateIsDefault)
// update IsActive
router.patch("/updateIsActive/:id", ScoreCommitteeController.updateIsActive)
// trang thung rac
router.get("/trashPage", CheckController.checkout('Committee'), ScoreCommitteeController.trashPage)
// remove vao thung rac
router.patch("/removeTrash/:id", CheckController.checkout('Committee'), ScoreCommitteeController.removeToTrash)
// Khoi phuc
router.patch("/revert/:id", CheckController.checkout('Committee'), ScoreCommitteeController.revert)


module.exports = router;