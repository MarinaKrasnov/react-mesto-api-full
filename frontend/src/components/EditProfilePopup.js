import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup ({ isOpen, onClose, handleSubmit }) {
  const [name, setName] = React.useState('')
  const [about, setAbout] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)
  React.useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser, isOpen])
  const handleInputName = e => {
    setName(e.target.value)
  }
  const handleInputAbout = e => {
    setAbout(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    handleSubmit({ name, about })
  }
  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <input
        id='name'
        type='text'
        name='user'
        className='popup__input popup__input_value_name'
        placeholder='Имя'
        minLength={2}
        maxLength={40}
        required=''
        value={name || ''}
        onChange={handleInputName}
      />
      <span id='name-error' className='popup__error' />
      <input
        id='profession'
        type='text'
        name='profession'
        className='popup__input popup__input_value_profession'
        placeholder='Профессия'
        minLength={2}
        maxLength={200}
        required=''
        value={about || ''}
        onChange={handleInputAbout}
      />
      <span id='profession-error' className='popup__error' />
      <button
        type='submit'
        className='popup__submit'
        aria-label='Кнопка сохранить'
      >
        Сохранить
      </button>
    </PopupWithForm>
  )
}

export default EditProfilePopup
