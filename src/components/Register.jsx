function Register() {
  return (
    <>
      <div className=''>
        <form className='edit-form'>
          <h2 className='edit-form__title'>Регистрация</h2>
          <input
            className='edit-form__field'
            type='email'
            name='email'
            placeholder='Email'
            required
          />
          <input
            className='edit-form__field'
            type='password'
            name='password'
            placeholder='Пароль'
            required
          />
          <button className='edit-form__btn-save' type='submit'>
            Зарегистрироваться
          </button>
          <div className=''>
            <p className=''>Уже зарегистрированы?</p>
            <a className='' href='#'>
              Войти
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
