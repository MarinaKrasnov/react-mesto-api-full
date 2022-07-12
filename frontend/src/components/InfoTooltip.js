import React from 'react'
import success from '../images/success.svg'
import error from '../images/error.svg'

function InfoTooltip ({ message, isOpen, onClose }) {
  const mode = message
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так!Попробуйте ещё раз.'
  const image = message ? `${success}` : `${error}`
  return (
    <div className={`overlay ${isOpen && 'overlay_active'}`}>
      <div className='popup popup_type_message'>
        <img
          className='popup_type_message__image'
          src={image}
          alt='System message'
        />
        <h2 className='popup__main-title popup__main-title_type_message'>
          {mode}
        </h2>
        <button type='button' className='button close-btn' onClick={onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip
