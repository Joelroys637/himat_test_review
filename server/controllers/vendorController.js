const Vendor = require('../models/Vendor');
const crypto = require('crypto');

exports.createVendor = async (req, res) => {
  try {
    const { businessType, shopName, keywords, googleReviewUrl } = req.body;

    if (!businessType || !shopName || !keywords || !googleReviewUrl) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Generate unique short ID, e.g., VND-8F3K2
    const shortId = crypto.randomBytes(3).toString('hex').toUpperCase();
    const vendorId = `VND-${shortId}`;

    const clientUrl = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
    const customerUrl = `${clientUrl}/review/${vendorId}`;

    const newVendor = new Vendor({
      vendorId,
      businessType,
      shopName,
      keywords: Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim()),
      googleReviewUrl,
      customerUrl,
      status: 'active'
    });

    await newVendor.save();

    res.status(201).json({
      success: true,
      vendorId,
      customerUrl
    });
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ success: false, message: 'Failed to create vendor' });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findOne({ vendorId });

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    res.status(200).json({
      success: true,
      vendor
    });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch vendor' });
  }
};
