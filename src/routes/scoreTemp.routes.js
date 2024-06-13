const express = require('express');
const router = express.Router();
const ScoreTempController = require('../app/controllers/scoretemp/ScoreTempController');
const CheckController = require("../app/Middleware/checkoutToken")
// delete
// revert
router.patch("/revert/:id", CheckController.checkout('Score'), ScoreTempController.revert)
// removeToTrash
router.patch("/removeToTrash/:id", CheckController.checkout('Score'), ScoreTempController.removeToTrash)
// pageTrash
router.get("/trashPage", CheckController.checkout('Score'), ScoreTempController.pageTrash)
// add
router.get("/addPage", CheckController.checkout('Score'), ScoreTempController.addPage)
router.post("/add", CheckController.checkout('Score'), ScoreTempController.add)
// update
router.get("/updatePage/:id", CheckController.checkout('Score'), ScoreTempController.getOne)
router.put("/update/:id", CheckController.checkout('Score'), ScoreTempController.update)
// getByProductGroupCode
router.get("/byProductGroup/:code", CheckController.checkout('Score'), ScoreTempController.getScoreTempByProductGroup)
// getByProductGroupId
router.get("/byProductGroupId/:id", CheckController.checkout('Score'), ScoreTempController.getScoreTempByProductGroupId)
// get
router.get("/", CheckController.checkout('Score'), ScoreTempController.index)
// getOne
router.get("/getOne/:id", CheckController.checkout('Score'), ScoreTempController.getOneAction)
module.exports = router;