function Register() {
  return (
    <>
      <div
        style={{
          maxWidth: '358px',
          margin: '0 auto',
        }}
      >
        <form className='login-form'>
          <h2 className='login-form__title'>Регистрация</h2>
          <input
            className='login-form__field'
            type='email'
            name='email'
            placeholder='Email'
            required
          />
          <input
            className='login-form__field'
            type='password'
            name='password'
            placeholder='Пароль'
            required
          />
          <button className='login-form__btn' type='submit'>
            Зарегистрироваться
          </button>
          <div className='login-form__link'>
            Уже зарегистрированы?
            &nbsp;
            <a className='link' href='/sign-in'>
              Войти
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
