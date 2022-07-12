import React from 'react'

function ImagePopup ({ card, onClose }) {
  return (
    <div className={`overlay overlay-image ${card && 'overlay_active'}`}>
      <div className='overlay-image__content '>
        <img
          src={card && card.link}
          className='overlay-image__image'
          alt='Увеличенное фото'
        />
        <button onClick={onClose} type='button' className='button close-btn ' />
        <p className='overlay-image__capture'>{card && card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
