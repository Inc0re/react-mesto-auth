import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onPlaceAdd}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onPlaceAdd({
      name: name,
      link: link,
    });
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
            value={name}
            onChange={handleNameChange}
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
            value={link}
            onChange={handleLinkChange}
          />
          <span className='edit-form__error' />
        </div>
      </PopupWithForm>
  );
}

export default AddPlacePopup;