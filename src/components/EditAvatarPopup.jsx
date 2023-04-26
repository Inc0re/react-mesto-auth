import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <div className='edit-form__wrapper'>
        <input
          className='edit-form__field'
          name='link'
          type='url'
          placeholder='Ссылка на картинку'
          required
          ref={inputRef}
        />
        <span className='edit-form__error' />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;