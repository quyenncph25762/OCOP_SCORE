const express = require('express');
const UserPageController = require('../app/controllers/UserPageController');
const router = express.Router();

router.get("/", UserPageController.index)
router.get("/trashPage", UserPageController.trash)
module.exports = router;