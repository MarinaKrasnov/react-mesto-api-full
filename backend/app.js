const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  errors, celebrate, Joi
} = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const ValidateUrl = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
require('dotenv').config();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(requestLogger);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri({ scheme: ['http', 'https'] }).pattern(ValidateUrl),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.use('*', auth, () => {
  throw new NotFoundError('Not found');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
  next();
});
app.listen(PORT);
