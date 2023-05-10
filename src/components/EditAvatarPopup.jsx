import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({avatar: values.link});
    console.log(values);
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      isValid={isValid}
    >
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
        <span className='edit-form__error'>{errors.link || ''}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;