const express = require('express');
const PdfScoreFileController = require('../app/controllers/generatorPDF/PdfScoreFileController');
const router = express.Router();
router.get('/generate/:scorefileId', PdfScoreFileController.generatePDF);

module.exports = router;
