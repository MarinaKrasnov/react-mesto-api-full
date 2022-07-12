import React from 'react'
import plus from '../images/Vector-3.svg'
import pen from '../images/Vector-2.svg'
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  handleCardDelete,
  handleCardLike,
  cards
}) {
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main className='content'>
      <div className='profile'>
        <div className='profile__container'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
          >
            <div className=' profile__overlay' arialabel='Обновить'></div>
          </div>
          <div className='profile__info'>
            <div className='profile__titleicon' onClick={onEditProfile}>
              <h1 className='profile__title'>{currentUser.name}</h1>
              <button
                type='button'
                className='button'
                arialabel='Кнопка редактирования'
              >
                <img
                  src={pen}
                  alt='Иконка редактирования'
                  className=' profile__icon'
                />
              </button>
            </div>
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
        </div>
        <button className='button' arialabel='Кнопка добавления'>
          <img
            src={plus}
            alt='Иконка добавления'
            className='profile__add-button'
            onClick={onAddPlace}
          />
        </button>
      </div>
      <section className='cards'>
        {cards.map(item => (
          <Card
            onCardClick={onCardClick}
            item={item}
            key={item._id}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
