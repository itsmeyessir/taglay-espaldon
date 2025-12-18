const jwt = require('jsonwebtoken');

const generateToken = (res, userId, rememberMe = false) => {
  // 30 days if rememberMe is true, else 24 hours
  const expiresIn = rememberMe ? '30d' : '24h';
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn, 
  });

  const isProduction = process.env.NODE_ENV === 'production';
  
  console.log('--- Cookie Generation Debug ---');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Is Production:', isProduction);
  console.log('SameSite:', isProduction ? 'none' : 'strict');
  console.log('Secure:', isProduction);
  console.log('-------------------------------');

  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: isProduction ? 'none' : 'strict', // Allow cross-site usage in production
    maxAge, 
  });
};

module.exports = generateToken;
