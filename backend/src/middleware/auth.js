import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // JWT_SECRET must be set in environment
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('✗ JWT_SECRET not set in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    jwt.verify(token, jwtSecret, (err, admin) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      req.admin = admin;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};
