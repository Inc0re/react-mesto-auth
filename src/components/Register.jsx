import AuthForm from './AuthForm'

function Register({ handleRegister }) {
  return (
    <AuthForm
      title='Регистрация'
      btnText='Зарегистрироваться'
      showLink={true}
      onSubmit={handleRegister}
    />
  )
}

export default Register
