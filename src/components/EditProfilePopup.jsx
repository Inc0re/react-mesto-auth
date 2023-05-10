import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import useFormAndValidation from '../hooks/useFormAndValidation'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation()
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    if (currentUser) {
      resetForm()
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      })
    }
  }, [currentUser, isOpen, setValues, resetForm])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values)
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className='edit-form__wrapper'>
        <input
          className='edit-form__field'
          name='name'
          type='text'
          placeholder='Имя'
          required
          minLength='2'
          maxLength='40'
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className='edit-form__error'>{errors.name || ''}</span>
      </div>
      <div className='edit-form__wrapper'>
        <input
          className='edit-form__field'
          name='about'
          type='text'
          placeholder='Место работы'
          required
          minLength='2'
          maxLength='200'
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className='edit-form__error'>{errors.about || ''}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
