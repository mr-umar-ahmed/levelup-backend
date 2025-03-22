const admin = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
  try {
    // Log headers for debugging (optional, remove in production)
    console.log('Request Headers:', req.headers);

    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided or invalid format' });
    }

    // Extract the token after "Bearer "
    const token = authHeader.split(' ')[1];

    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach the decoded user info to the request object
    req.user = decodedToken;

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    // Handle token verification errors
    console.error('Token Verification Error:', err.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;