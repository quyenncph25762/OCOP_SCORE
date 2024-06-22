const express = require('express');
const ScoreTempDetailController = require('../app/controllers/scoretemp/ScoreTempDetailController');
const router = express.Router();
const CheckController = require("../app/Middleware/checkoutToken")
// delete forever
router.delete("/remove/:id", CheckController.checkout('Score'), ScoreTempDetailController.remove)
// delete forever All
router.delete("/removeAll", CheckController.checkout('Score'), ScoreTempDetailController.removeAll)
// khoi phuc
router.patch("/revert/:id", CheckController.checkout('Score'), ScoreTempDetailController.revert)
// khoi phuc
router.post("/revertAll", CheckController.checkout('Score'), ScoreTempDetailController.revertAll)
// deleteToTrashAll
router.post("/removeToTrash", CheckController.checkout('Score'), ScoreTempDetailController.removeToTrash)
// get phieu cham chi tieu theo phieu cham
router.get("/scoreTemp/:id", CheckController.checkout('Score'), ScoreTempDetailController.getScoreTempDetailFilter)
// getOne ScoreTempDetail by id
router.get("/getOne/:id", CheckController.checkout('Score'), ScoreTempDetailController.getOne)
// get by scorefile
router.get("/byScoreFile/:id", CheckController.checkout('Score'), ScoreTempDetailController.getScoreDetailByScoreFile)
// them
router.post("/add", CheckController.checkout('Score'), ScoreTempDetailController.addScoreTempDetail)
// updae
router.put("/update", CheckController.checkout('Score'), ScoreTempDetailController.updateScoreTempDetail)


module.exports = router;