import AuthForm from './AuthForm'

function Login({ setLoggedIn, handleLogin }) {
  return (
    <AuthForm
      title='Вход'
      btnText='Войти'
      showLink={false}
      onSubmit={handleLogin}
    />
  )
}

export default Login
