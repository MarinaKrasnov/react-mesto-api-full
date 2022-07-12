import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card ({ item, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = item.owner._id === currentUser._id
  const cardDeleteButtonClassName = `button card__button-delete ${
    isOwn ? 'card__button-delete_visible' : 'card__button-delete_hidden'
  }`
  const isLiked = item.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = `button card__button-like ${
    isLiked ? 'card__button-like_active' : ''
  }`
  const handleDelete = () => {
    onCardDelete(item)
  }
  const handleClick = () => {
    onCardClick(item)
  }
  const handleLikeClick = () => {
    onCardLike(item)
  }

  return (
    <article className='card' aria-label='Карточка' key={item._id}>
      <img
        className='card__image'
        src={item.link}
        /*        style={{ backgroundImage: `url(${item.link})` }} */
        alt={`Виды на ${item.name}`}
        onClick={handleClick}
      />
      <button
        type='button'
        className={cardDeleteButtonClassName}
        aria-label='Кнопка удаления карточки'
        onClick={handleDelete}
      />
      <div className='card__info'>
        <h3 className='card__text'>{item.name}</h3>
        <input type='hidden' name='id' defaultValue />
        <div className='card__likes'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            aria-label='Кнопка лайк'
            onClick={handleLikeClick}
          ></button>
          <p className='card__number-likes'>{item.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card
