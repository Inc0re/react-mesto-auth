import { Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Header({ loggedIn, handleLogout }) {
  const currentUser = useContext(CurrentUserContext)
  const location = useLocation()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (currentUser && currentUser.email) {
      setEmail(currentUser.email)
    }
  }, [currentUser])

  function logOut() {
    handleLogout()
  }

  return (
    <header className='header'>
      <Link className='header__logo' to='/' />
      {!loggedIn ? (
        location.pathname === '/sign-in' ? (
          <Link className='header__link' to='/sign-up'>
            Регистрация
          </Link>
        ) : (
          <Link className='header__link' to='/sign-in'>
            Войти
          </Link>
        )
      ) : (
        <div className='header__container'>
          {currentUser && (
            <div className='header__email'>{email}</div>
          )}
          <Link
            className='header__link header__link_color_gray'
            onClick={logOut}
          >
            Выйти
          </Link>
        </div>
      )}
    </header>
  )
}
