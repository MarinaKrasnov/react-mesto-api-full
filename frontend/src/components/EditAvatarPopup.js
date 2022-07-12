import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup ({ isOpen, onClose, onSubmit }) {
  const avatar = React.useRef()
  function handleSubmit (e) {
    e.preventDefault()
    onSubmit(avatar.current.value)
    avatar.current.value = ''
  }
  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type='hidden' name='id' defaultValue='' />
      <label>
        <input
          id='avatar'
          type='url'
          name='avatar'
          className='popup__input popup__input_type_avatar'
          placeholder='Ссылка на картинку'
          required=''
          ref={avatar}
        />
        <span id='avatar-error' className='popup__error popup__error_size_s' />
      </label>
      <button
        type='submit'
        className='popup__submit popup__submit-add'
        aria-label='Кнопка создать'
      >
        Сохранить
      </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
