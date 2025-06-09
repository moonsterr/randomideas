const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Usually token is sent in the Authorization header as: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // get token part

  if (!token) {
    return res.status(401).json({
      success: false,
      token: null,
      message: 'Access denied. No token provided.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: 'Invalid token.' });
    }

    // user is the decoded payload inside the token (e.g. username, userId)
    req.user = user; // attach user info to the request object
    next(); // pass control to the next middleware or route handler
  });
};

module.exports = authenticateToken;
