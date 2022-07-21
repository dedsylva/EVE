const jwt = require('jsonwebtoken');
const config = require('config');

// This is for logging in info
// For logging out, you simply delete the token on the client side

module.exports = function auth(req, res, next) {
	const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');

  try {
    const decoded = jwt.verify(token, config.get('dedsPrivateKey')); // return payload
    req.user = decoded;
    next(); //calling next middleware function
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}