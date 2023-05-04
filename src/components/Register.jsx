import { useState } from 'react'
import AuthForm from './AuthForm'
import InfoTooltip from './InfoTooltip'
import authApi from '../utils/AuthApi'

function Register() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPopupOpened, setIsPopupOpened] = useState(false)

  function handleRegister(userData) {
    authApi
      .register(userData)
      .then(res => {
        setIsSuccess(true)
        setIsPopupOpened(true)
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
        title='Регистрация'
        btnText='Зарегистрироваться'
        showLink={true}
        onSubmit={handleRegister}
      />
      <InfoTooltip
        isOpened={isPopupOpened}
        isSuccess={isSuccess}
        setIsPopupOpened={setIsPopupOpened}
      />
    </>
  )
}

export default Register
