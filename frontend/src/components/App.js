import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup.js'
import LogIn from './LogIn'
import { Route, Switch, Link } from 'react-router-dom'
import Register from './Register'
import * as auth from './../utils/auth'
import { useHistory } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
function App () {
  // State constants
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  )
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  )
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const history = useHistory()
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false)
  const [message, setMessage] = React.useState(false)
  const [email, setEmail] = React.useState()
  const [jwt, setJWT] = React.useState(localStorage.getItem('jwt'));
  // Effects
  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getCards(jwt), api.getProfileInfo(jwt)])
        .then(([cards, userData]) => {
          setCards(cards)
          setCurrentUser(userData)
        })
        .catch(err => {
          console.log(`Request for data from server is failed.${err}`)
        })
    }
  }, [isLoggedIn, jwt])
  React.useEffect(() => {
    const checkToken = () => {
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        auth.checkToken(jwt).then(response => {
          setEmail(response.email)
          setIsLoggedIn(true)
          history.push('/')
        })
      }
    }
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])
  //Handlers
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setInfoTooltip(false)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleEditProfileChange ({ name, about }) {
    api
      .editProfileInfo({ name, about },jwt)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleEditAvatar (avatar) {
    api
      .changeAvatar(avatar,jwt)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked,jwt)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleCardDelete (card) {
    api
      .deleteCard(card._id,jwt)
      .then(() => {
        setCards(cards =>
          cards.filter(item => {
            return item._id !== card._id
          })
        )
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleAddPlaceSubmit (newCard) {
    api
      .postCard(newCard,jwt)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }
  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then(response => {
        if (response.email) {
          setMessage(true)
          setInfoTooltip(true)
          React.setTimeOut(() => {
            history.push('/signin')
          }, 3000)
        } else {
          setMessage(false)
          setInfoTooltip(true)
        }
      })
      .then(res => {
        if (!res.email) {
          setMessage(false)
          setInfoTooltip(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleLogin = (email, password) => {
    auth.login(email, password).then(response => {
      if (response.token) {
        setJWT(response.token)
        localStorage.setItem('jwt', response.token)
        setIsLoggedIn(true)
        setEmail(email)
        history.push('/')
      } else {
        setMessage(false)
        setInfoTooltip(true)
      }
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    setEmail('')
    history.push('/signin')
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
          <Header className={'header_type_loggedin'}>
            <div className='header__email-container'>
              <p className='header__email'>{email}</p>
              <Link
                to='signin'
                className='header__link link header__link_type_loggedin'
                onClick={handleSignOut}
              >
                Выйти
              </Link>
            </div>
          </Header>
          <Main
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleEditProfileChange}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleEditAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name={'ausure'}
            title='Вы уверены?'
            onClose={closeAllPopups}
          >
            <input type='hidden' name='id' defaultValue='' />

            <button
              type='submit'
              className='popup__submit popup__submit_size_s'
              aria-label='Кнопка согласия'
            >
              Да
            </button>
          </PopupWithForm>
        </ProtectedRoute>
        <Route path='/signup'>
          <Header className={'header_type_login'}>
            <Link to='signin' className='link'>
              Войти
            </Link>
          </Header>
          <div className='form__container'>
            <Register onRegister={handleRegister} />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            message={message}
            isOpen={isInfoTooltipOpen}
          />
        </Route>
        <Route path='/signin'>
          <Header className={'header_type_login'}>
            <Link to='signup' className='header__link link'>
              Регистрация
            </Link>
          </Header>
          <div className='form__container'>
            <LogIn onLogin={handleLogin} />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            message={message}
            isOpen={isInfoTooltipOpen}
          />
        </Route>
  {/*       <Route exact path='/'>
          {isLoggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}
        </Route> */}
      </Switch>
    </CurrentUserContext.Provider>
  )
}

export default App
