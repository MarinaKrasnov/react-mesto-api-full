import React from 'react'
import { Route } from 'react-router-dom'

const LogIn = ({ onLogin }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  })
  /*   const [message, setMessage] = React.useState('') */

  const handleChange = e => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (onLogin && inputs.email && inputs.password) {
      onLogin(inputs.email, inputs.password)
    }
  }
  return (
    <Route path='/sign-in'>
      <form onSubmit={handleSubmit} className='form'>
        <p className='form__title'>Вход</p>
        {/*         <p className='register__error'>{inputs.message}</p> */}
        <input
          id='email'
          name='email'
          type='email'
          value={inputs.email}
          onChange={handleChange}
          className='form__input'
          placeholder='Email'
        />
        <input
          id='password'
          name='password'
          type='password'
          value={inputs.password}
          onChange={handleChange}
          className='form__input'
          placeholder='Пароль'
        />
        <div className='form__button-container'>
          <button type='submit' className='form__submit'>
            Войти
          </button>
        </div>
      </form>
    </Route>
  )
}

export default LogIn
