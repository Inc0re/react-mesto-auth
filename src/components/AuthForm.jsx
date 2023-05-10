import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'

function AuthForm({ title, btnText, onSubmit, showLink }) {
  const { values, handleChange } = useForm({})
  // const [userData, setUserData] = useState({
  //   email: '',
  //   password: '',
  // })

  // function handleChange(e) {
  //   const { name, value } = e.target
  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   })
  // }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2 className='login-form__title'>{title}</h2>
      <input
        className='login-form__field'
        type='email'
        name='email'
        placeholder='Email'
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      <input
        className='login-form__field'
        type='password'
        name='password'
        placeholder='Пароль'
        value={values.password || ''}
        onChange={handleChange}
        required
      />
      <button className='login-form__btn' type='submit'>
        {btnText}
      </button>
      {showLink && (
        <div className='login-form__link'>
          Уже зарегистрированы? &nbsp;
          <Link className='link' to='/sign-in'>
            Войти
          </Link>
        </div>
      )}
    </form>
  )
}

export default AuthForm
