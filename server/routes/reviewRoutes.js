const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/generate', reviewController.generateReview);

module.exports = router;
