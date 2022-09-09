const jwt = require('jsonwebtoken');

const TOKEN_KEY = 'werup32198hreqbeifqfdbdfgewf8asf7dfn324i32';

module.exports.createToken = function (identifier) {
  const token = jwt.sign({ user_id: identifier }, TOKEN_KEY);
  console.log('TOKEN: ', token);
  return token;
};

module.exports.verifyToken = function (req, res, next) {
  const token = req.body.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('Admin token not found');
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user_id = decoded.user_id;
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
  return next();
};
