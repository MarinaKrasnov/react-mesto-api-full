const BadRequestError = require('../errors/bad-request-err');
const ForbidError = require('../errors/forbid-err');
const NotFoundError = require('../errors/not-found-error');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next)
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(201).send({ data: card });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'))
      } else {
        next(err);
      }
    })
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по указанному id не найдена'))
      } else if (req.user._id !== card.owner.toString()) {
        next(new ForbidError('У вас нет прав на удаление'))
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then((user) => res.status(200).send({ data: user })).catch(next)
    }).catch(next)
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по указанному id не найдена'))
      } else {
        res.status(200).send({ message: 'Like' })
      }
    }).catch(next)
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по указанному id не найдена'))
      } else {
        res.status(200).send({ message: 'Dislike' })
      }
    }).catch(next)
};
