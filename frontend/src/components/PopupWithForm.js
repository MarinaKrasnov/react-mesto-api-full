import React from 'react'

function PopupWithForm ({ name, title, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`overlay overlay-${name} ${isOpen && 'overlay_active'}`}>
      <form className='overlay__form' name={`form-${name}`} onSubmit={onSubmit}>
        <fieldset className={`popup popup_type_${name}`}>
          <h2 className='popup__main-title'>{title}</h2>
          {children}
          <button
            type='button'
            className='button close-btn'
            onClick={onClose}
          />
        </fieldset>
      </form>
    </div>
  )
}

export default PopupWithForm
