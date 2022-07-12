const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth');

const auth = (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    next(new UnauthorizedError('jwt is not valid'));
  } else {
    const token = cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new UnauthorizedError('jwt is not valid'));
    }
    if (payload) {
      req.user = payload;
    }
    const { authorization } = req.headers;
    console.log(authorization);
  }
  next()
}
/* module.exports = auth;
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('jwt is not valid'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('jwt is not valid'));
  }
  req.user = payload;
  next();
};
*/
module.exports = auth;
