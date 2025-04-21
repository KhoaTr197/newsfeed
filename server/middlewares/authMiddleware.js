const jwt = require('jsonwebtoken');
const logger = require("./logger");
// -------------------------------------------

const log = logger()

const auth = {}

//  Auth Config
const authConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  options: {
    expiresIn: '24h' // Token expires in 24 hours
  }
};

// Generate JWT token
auth.generateToken = (userData) => {
  return jwt.sign(userData, authConfig.secret, authConfig.options);
};

// Verify JWT token
auth.verifyToken = (redirectRoute) => {
  return (req, res, next) => {
    // Check for token in cookies, headers, or query params
    const token = req.cookies?.token || req.headers['authorization'] || req.query?.token;

    if (!token) {
      return res.redirect(redirectRoute || "/login"); // Redirect to login page if no token
    }

    try {
      // Remove 'Bearer ' from token if present
      const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;

      // Verify token
      const decoded = jwt.verify(tokenString, authConfig.secret);

      // Add user info to request
      req.user = decoded;

      log.master(`User ${decoded.username} has been authenticated!`);
      next();
    } catch (err) {
      log.master(`Authentication error: ${err.message}`);
      return res.redirect(redirectRoute || "/login"); // Redirect to login page if invalid token
    }
  }
};

// Role-based authorization
auth.checkRole = (roles, redirectRoute) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect(redirectRoute || "/login"); // Redirect to login page if no user data found
    }

    if (!roles.includes(req.user.role)) {
      return res.redirect(redirectRoute || "/login"); // Redirect to login page if role is not allowed
    }

    log.master(`User ${req.user.username} has been authorized!`);
    next();
  };
};

module.exports = auth;