const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const auth = require('../middleware/auth');

router.put('/update', auth, vendorController.updateVendor);
router.get('/:vendorId', vendorController.getVendor);

module.exports = router;
