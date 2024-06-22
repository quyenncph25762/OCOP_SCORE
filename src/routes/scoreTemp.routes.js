const express = require('express');
const router = express.Router();
const ScoreTempController = require('../app/controllers/scoretemp/ScoreTempController');
const CheckController = require("../app/Middleware/checkoutToken")
// delete
// revert
router.patch("/revert/:id", CheckController.checkout('Category'), ScoreTempController.revert)
// revertAll
router.post("/revertAll", CheckController.checkout('Category'), ScoreTempController.revertAll)
// removeToTrash
router.patch("/removeToTrash/:id", CheckController.checkout('Category'), ScoreTempController.removeToTrash)
// removeToTrashAll
router.post("/removeToTrashAll", CheckController.checkout('Category'), ScoreTempController.removeToTrashAll)
// pageTrash
router.get("/trashPage", CheckController.checkout('Category'), ScoreTempController.pageTrash)
// add
router.get("/addPage", CheckController.checkout('Category'), ScoreTempController.addPage)
router.post("/add", CheckController.checkout('Category'), ScoreTempController.add)
// update
router.get("/updatePage/:id", CheckController.checkout('Category'), ScoreTempController.getOne)
router.put("/update/:id", CheckController.checkout('Category'), ScoreTempController.update)
// getByProductGroupCode
router.get("/byProductGroup/:code", CheckController.checkout('Category'), ScoreTempController.getScoreTempByProductGroup)
// getByProductGroupId
router.get("/byProductGroupId/:id", ScoreTempController.getScoreTempByProductGroupId)
// get
router.get("/", CheckController.checkout('Category'), ScoreTempController.index)
// getOne
router.get("/getOne/:id", CheckController.checkout('Category'), ScoreTempController.getOneAction)
module.exports = router;