const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.registerVendor);
router.post('/login', authController.loginVendor);
router.post('/google', authController.googleLogin);
router.get('/me', auth, authController.getMe);

module.exports = router;
