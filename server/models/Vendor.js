const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorId: { type: String, required: true, unique: true },
  businessType: { type: String, required: true },
  shopName: { type: String, required: true },
  keywords: { type: [String], default: [] },
  googleReviewUrl: { type: String, required: true },
  customerUrl: { type: String, required: true },
  status: { type: String, default: 'active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);
