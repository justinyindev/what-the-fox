const express = require('express');
const headlineController = require("./../controllers/headlineController");

const router = express.Router();

router.get('/', headlineController.getHeadlines);

module.exports = router;
