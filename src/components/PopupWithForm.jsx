import Popup from './Popup'

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  children,
  buttonText,
  onSubmit,
  isValid
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form
        action='#'
        className='edit-form'
        method='post'
        name={name}
        onSubmit={onSubmit}
      >
        <h2 className='edit-form__title'>{title}</h2>
        {children}
        <button className='edit-form__btn-save' type='submit' disabled={!isValid}>
          {buttonText}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm
