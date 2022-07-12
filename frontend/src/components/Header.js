import React from 'react'
import logo from '../images/logo.svg'

function Header ({ children, className }) {
  return (
    <header className={`header ${className}`}>
      <img className='header__logo' src={logo} alt='Логотип Место' />
      {children}
    </header>
  )
}

export default Header
