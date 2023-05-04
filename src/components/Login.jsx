import { useState } from 'react'
import AuthForm from './AuthForm'
import InfoTooltip from './InfoTooltip'
import authApi from '../utils/AuthApi'

function Login() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPopupOpened, setIsPopupOpened] = useState(false)

  function handleLogin(userData) {
    authApi
      .login(userData)
      .then(res => {
        setIsSuccess(true)
        setIsPopupOpened(true)
        console.log(res.token)
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
