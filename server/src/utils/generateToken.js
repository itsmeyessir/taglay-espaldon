const jwt = require('jsonwebtoken');

const generateToken = (res, userId, rememberMe = false) => {
  // 30 days if rememberMe is true, else 24 hours
  const expiresIn = rememberMe ? '30d' : '24h';
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn, 
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Allow cross-site usage in production
    maxAge, 
  });
};

module.exports = generateToken;
