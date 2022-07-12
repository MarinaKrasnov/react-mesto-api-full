import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
/* import './styles/Register.css' */

const Register = ({ onRegister }) => {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('state:', state)
    if (onRegister && state.email) {
      onRegister(state.email, state.password)
    }
  }

  return (
    <Route path='/sign-up'>
      <form onSubmit={handleSubmit} className='form'>
        <p className='form__title'>Регистрация.</p>
        <p className='register__error'>{state.message}</p>
        <input
          id='email'
          name='email'
          type='email'
          value={state.email}
          onChange={handleChange}
          className='form__input'
          placeholder='Email'
        />
        <input
          id='password'
          name='password'
          type='password'
          value={state.password}
          onChange={handleChange}
          className='form__input'
          placeholder='Пароль'
        />
        <div className='form__button-container'>
          <button type='submit' className='form__submit'>
            Зарегистрироваться
          </button>
          <div className='form__sign-in-up'>
            <p>Уже зарегистрированы? </p>
            <Link to='sign-in' className='link form__link'>
              Войти
            </Link>
          </div>
        </div>
      </form>
    </Route>
  )
}

export default Register
