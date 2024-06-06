const express = require('express');
const UserPageController = require('../app/controllers/UserPageController');
const router = express.Router();
const upload = require("../app/Middleware/uploadMiddle")
router.get("/", UserPageController.index)
router.post("/add", upload.single("Avatar"), UserPageController.create)
router.patch("/update/:id", upload.single("Avatar"), UserPageController.update)
router.get("/trashPage", UserPageController.trash)
module.exports = router;