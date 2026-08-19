const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorId: { type: String, required: true, unique: true },
  
  // Auth fields
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },

  // Business fields (optional on signup, filled later)
  businessType: { type: String, default: '' },
  shopName: { type: String, default: '' },
  keywords: { type: [String], default: [] },
  googleReviewUrl: { type: String, default: '' },
  customerUrl: { type: String, default: '' },
  
  // Customization fields
  qrTemplate: { type: String, default: 'standard' },
  qrColor: { type: String, default: '#000000' },

  // Analytics fields
  totalReviewsGenerated: { type: Number, default: 0 },
  profileViews: { type: Number, default: 0 },
  qrScans: { type: Number, default: 0 },
  averageRating: { type: Number, default: 4.8 },

  status: { type: String, default: 'active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);
