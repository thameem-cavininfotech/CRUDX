import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to the request
    next(); // Move to the next middleware/controller
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
