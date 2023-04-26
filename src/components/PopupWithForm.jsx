export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__container'>
        <button className='popup__close' type='button' onClick={onClose} />
        <form
          action='#'
          className='edit-form'
          method='post'
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className='edit-form__title'>{title}</h2>
          {children}
          <button className='edit-form__btn-save' type='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
