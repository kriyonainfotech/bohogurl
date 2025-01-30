const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  // Extract token from 'Authorization' header, expecting 'Bearer <token>'
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle different errors more specifically
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    // Attach user ID or decoded data to request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
