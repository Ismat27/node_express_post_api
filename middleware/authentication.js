const { UnauthenticatedError, APIError } = require("../errors")

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthenticatedError('unauthorized')
    }
    const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            throw new UnauthenticatedError('Invalid token')
    }
};

// This middleware checks if the user has the required role
const authorize = (role) => {
    return (req, res, next) => {
      try {
        // Check if the user has the required role
        if (req.user.role !== role) {
          throw new Error();
        }
  
        next();
      } catch (error) {
        throw new APIError('Authorization failed', 403)
      }
    };
};

module.exports = {
    authMiddleware,
    authorize
};
