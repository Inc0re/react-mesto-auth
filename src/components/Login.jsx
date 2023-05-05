import { useState } from 'react'
import AuthForm from './AuthForm'
import InfoTooltip from './InfoTooltip'
import authApi from '../utils/AuthApi'

function Login({ setLoggedIn }) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPopupOpened, setIsPopupOpened] = useState(false)

  function handleLogin(userData) {
    authApi
      .login(userData)
      .then(res => {
        if (res.token) {
          setIsSuccess(true)
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          console.log('Успешная авторизация. Токен сохранен в localStorage')
        }
      })
      .catch(err => {
        setIsSuccess(false)
        setIsPopupOpened(true)
        console.log(err)
      })
  }

  return (
    <>
      <AuthForm
        title='Вход'
        btnText='Войти'
        showLink={false}
        onSubmit={handleLogin}
      />
      <InfoTooltip
        isOpened={isPopupOpened}
        isSuccess={isSuccess}
        setIsPopupOpened={setIsPopupOpened}
      />
    </>
  )
}

export default Login
