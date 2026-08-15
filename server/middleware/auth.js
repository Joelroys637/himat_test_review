const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_12345';

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if no token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.vendor = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};
