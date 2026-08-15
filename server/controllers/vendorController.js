const Vendor = require('../models/Vendor');
const crypto = require('crypto');

exports.updateVendor = async (req, res) => {
  try {
    const { businessType, shopName, keywords, googleReviewUrl, qrTemplate, qrColor } = req.body;
    
    // Vendor ID is available from auth middleware req.vendor
    const vendor = await Vendor.findById(req.vendor.id);
    
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    if (businessType !== undefined) vendor.businessType = businessType;
    if (shopName !== undefined) vendor.shopName = shopName;
    if (keywords !== undefined) vendor.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
    if (googleReviewUrl !== undefined) vendor.googleReviewUrl = googleReviewUrl;
    if (qrTemplate !== undefined) vendor.qrTemplate = qrTemplate;
    if (qrColor !== undefined) vendor.qrColor = qrColor;

    // Generate customerUrl if it doesn't exist
    if (!vendor.customerUrl) {
      const clientUrl = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
      vendor.customerUrl = `${clientUrl}/review/${vendor.vendorId}`;
    }

    await vendor.save();

    res.status(200).json({
      success: true,
      vendorId: vendor.vendorId,
      customerUrl: vendor.customerUrl,
      vendor
    });
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ success: false, message: 'Failed to update vendor business details' });
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
