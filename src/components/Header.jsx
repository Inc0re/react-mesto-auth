import { Link, useLocation } from 'react-router-dom'

export default function Header({ loggedIn }) {
  const location = useLocation()

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
        <Link className='header__link header__link_color_gray' to='/sign-in'>
          Выйти
        </Link>
      )}
    </header>
  )
}
