const express = require('express');
const router = express.Router();
const ScoreTempController = require('../app/controllers/ScoreTempController');

// delete
// revert
router.patch("/revert/:id", ScoreTempController.revert)
// removeToTrash
router.patch("/removeToTrash/:id", ScoreTempController.removeToTrash)
// pageTrash
router.get("/", ScoreTempController.index)
// get
router.get("/trash", ScoreTempController.pageTrash)
// add
router.get("/addPage", ScoreTempController.addPage)
router.post("/add", ScoreTempController.add)
// update
router.get("/updatePage/:id", ScoreTempController.getOne)
router.put("/update/:id", ScoreTempController.update)

module.exports = router;