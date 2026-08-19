const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_12345';

exports.registerVendor = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ $or: [{ username }, { email }] });
    if (existingVendor) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique vendorId
    const vendorId = crypto.randomBytes(8).toString('hex');

    const newVendor = new Vendor({
      vendorId,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newVendor.save();

    // Create token
    const token = jwt.sign({ id: newVendor._id, vendorId: newVendor.vendorId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      token,
      vendor: {
        id: newVendor._id,
        vendorId: newVendor.vendorId,
        username: newVendor.username,
        email: newVendor.email
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

exports.loginVendor = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Find vendor by username
    const vendor = await Vendor.findOne({ username });
    if (!vendor) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: vendor._id, vendorId: vendor.vendorId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      token,
      vendor: {
        id: vendor._id,
        vendorId: vendor.vendorId,
        username: vendor.username,
        email: vendor.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id).select('-password');
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.status(200).json({ success: true, vendor });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

require('../config/firebase-admin');
const { getAuth } = require('firebase-admin/auth');

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Google token is required' });
    }

    // Verify the Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(token);
    const { email, name, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google account has no email' });
    }

    // Check if vendor already exists
    let vendor = await Vendor.findOne({ email });

    if (!vendor) {
      // Create new vendor if they don't exist
      const vendorId = crypto.randomBytes(8).toString('hex');
      
      // Auto-generate a username from name or email
      let baseUsername = (name || email.split('@')[0]).replace(/\s+/g, '').toLowerCase();
      let username = baseUsername;
      
      // Ensure unique username
      let usernameExists = await Vendor.findOne({ username });
      let counter = 1;
      while (usernameExists) {
        username = `${baseUsername}${counter}`;
        usernameExists = await Vendor.findOne({ username });
        counter++;
      }

      vendor = new Vendor({
        vendorId,
        username,
        email,
        phone: 'Google Auth', // Placeholder since Google doesn't always provide phone
        password: crypto.randomBytes(20).toString('hex'), // Random dummy password
      });

      await vendor.save();
    }

    // Create JWT token for our app's session
    const jwtToken = jwt.sign({ id: vendor._id, vendorId: vendor.vendorId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      token: jwtToken,
      vendor: {
        id: vendor._id,
        vendorId: vendor.vendorId,
        username: vendor.username,
        email: vendor.email
      }
    });

  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ success: false, message: 'Server error during Google authentication', error: err.message });
  }
};
