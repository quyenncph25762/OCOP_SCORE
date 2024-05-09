const express = require('express');
const ScoreTempController = require('../app/controllers/ScoreTempController');
const router = express.Router();

router.get("/", ScoreTempController.index)
router.get("/add", ScoreTempController.add)

module.exports = router;