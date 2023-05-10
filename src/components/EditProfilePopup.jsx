import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }
  }, [currentUser, isOpen])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
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
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className='edit-form__error' />
      </div>
      <div className='edit-form__wrapper'>
        <input
          className='edit-form__field'
          name='description'
          type='text'
          placeholder='Место работы'
          required
          minLength='2'
          maxLength='200'
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className='edit-form__error' />
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
