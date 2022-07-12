import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup ({ isOpen, onClose, handleSubmit }) {
  const [name, setName] = React.useState('')
  const [url, setUrl] = React.useState('')
  const handleInputName = e => {
    setName(e.target.value)
  }
  const handleInputUrl = e => {
    setUrl(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    handleSubmit({ name, url })
    setName('')
    setUrl('')
  }
  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <input
        id='name-place'
        type='text'
        name='name'
        className='popup__input popup__input_type_place-name'
        placeholder='Название'
        minLength={2}
        maxLength={30}
        required=''
        onChange={handleInputName}
        value={name || ''}
      />
      <span id='name-place-error' className='popup__error' />
      <input
        id='url'
        type='url'
        name='link'
        className='popup__input popup__input_type_link'
        placeholder='Ссылка на картинку'
        required=''
        onChange={handleInputUrl}
        value={url || ''}
      />
      <span id='url-error' className='popup__error' />
      <input type='hidden' name='id' defaultValue='' />
      <button
        type='submit'
        className='popup__submit popup__submit-add'
        aria-label='Кнопка создать'
      >
        Создать
      </button>
      <input type='hidden' name='id' defaultValue='' />
    </PopupWithForm>
  )
}

export default AddPlacePopup
