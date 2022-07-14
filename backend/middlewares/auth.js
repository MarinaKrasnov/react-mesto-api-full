const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth');

/* const auth = (req, res, next) => {
  const { cookies } = req;


  if (!cookies) {
    next(new UnauthorizedError('Все плохо'));
  } else {
    const token = cookies.jwt;
    console.log('auth',token);
    let payload;
    try {
      payload = jwt.verify(token,  process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET :  'dev-secret');
    } catch (err) {
      next(new UnauthorizedError('jwt is not valid'));
    }
    if (payload) {
      req.user = payload;
    }
  }
  next()
} */
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

module.exports = auth;
