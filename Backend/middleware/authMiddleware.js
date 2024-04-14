const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Send a 401 response if the token is missing
    return res.status(401).send('Access denied. No token provided.');
  } else {
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach the user to the request object
      req.user = decoded;
      next();
    } catch (err) {
      // Send a 400 response if the token is invalid
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
};


module.exports = authMiddleware;
