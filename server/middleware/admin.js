module.exports = function (req, res, next) {
  // 401 Unauthorized - try to access some part without the right token
  // 403 Forbidden - forbidden even with valid token (doesn't have the role)

	if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
}
