const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Usually token is sent in the Authorization header as: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader.split(' ')[1]; // get token part
  console.log(token);

  if (!token) {
    return res.status(502).json({
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

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
