import React from 'react'
import PopupWithForm from './PopupWithForm'
import useForm from '../hooks/useForm'

function AddPlacePopup({ isOpen, onClose, onPlaceAdd }) {
  const { values, handleChange, setValues } = useForm({})

  React.useEffect(() => {
    setValues({
      name: '',
      link: '',
    })
  }, [isOpen, setValues])

  function handleSubmit(e) {
    e.preventDefault()

    onPlaceAdd(values)
  }

  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Создать'
      onSubmit={handleSubmit}
    >
      <div className='edit-form__wrapper'>
        <input
          className='edit-form__field'
          name='name'
          type='text'
          placeholder='Название'
          required
          minLength='2'
          maxLength='30'
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className='edit-form__error' />
      </div>
      <div className='edit-form__wrapper'>
        <input
          className='edit-form__field'
          name='link'
          type='url'
          placeholder='Ссылка на картинку'
          required
          value={values.link || ''}
          onChange={handleChange}
        />
        <span className='edit-form__error' />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
