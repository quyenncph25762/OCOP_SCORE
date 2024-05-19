const express = require('express');
const ScoreTempDetailController = require('../app/controllers/ScoreTempDetailController');
const router = express.Router();
// delete forever
router.delete("/remove/:id", ScoreTempDetailController.remove)
// khoi phuc
router.patch("/revert/:id", ScoreTempDetailController.revert)
// deleteToTrash
router.patch("/removeToTrash/:id", ScoreTempDetailController.removeToTrash)
// get phieu cham chi tieu theo phieu cham
router.get("/scoreTemp/:id", ScoreTempDetailController.getScoreTempDetailFilter)
// them
router.post("/add", ScoreTempDetailController.addScoreTempDetail)
// updae
router.put("/update/:id", ScoreTempDetailController.updateScoreTempDetail)
module.exports = router;