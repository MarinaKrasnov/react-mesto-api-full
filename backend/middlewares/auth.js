const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth');

const auth = (req, res, next) => {
  const { cookies } = req;
  const { authorization } = req.headers;
  if (cookies.jwt || authorization.startsWith('Bearer ')) {
    const token = cookies.jwt ? cookies.jwt : authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    } catch (err) {
      return next(new UnauthorizedError('jwts been checked. jwt is not valid'));
    }
    if (payload) {
      req.user = payload;
    }
  } else {
    return next(new UnauthorizedError('jwt is not valid'));
  }
  next()
}
module.exports = auth;
