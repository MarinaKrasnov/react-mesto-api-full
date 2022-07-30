const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth');

const auth = (req, res, next) => {
  const { cookies } = req;
  const { authorization } = req.headers;
  if (!!cookies || !!authorization) {
    const token = cookies ? cookies.jwt : authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new UnauthorizedError('jwt is not valid'));
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
/* module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
}; */
