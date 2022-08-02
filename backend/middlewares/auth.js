const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth');

const auth = (req, res, next) => {
  const { cookies } = req;
  const { authorization } = req.headers;
  console.log('auth', authorization);
  console.log('cookies', cookies);
  console.log('(cookies.jwt || authorization.startsWith("Bearer "))', cookies.jwt || authorization.startsWith('Bearer '));

  if (cookies || authorization.startsWith('Bearer ')) {
    const token = cookies ? cookies.jwt : authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new UnauthorizedError('jwts been checked. jwt is not valid'));
    }
    if (payload) {
      req.user = payload;
    }
  } else {
    next(new UnauthorizedError('jwt is not valid'));
  }
  next()
}
module.exports = auth;
