import okImage from '../images/status-ok.svg'
import errorImage from '../images/status-error.svg'

function InfoTooltip({ isSuccess, isOpened, setIsPopupOpened }) {
  function handleClose() {
    setIsPopupOpened(false)
  }

  return (
    <div className={`popup popup_type_info ${isOpened && 'popup_opened'}`}>
      <div className='popup__container'>
        <button className='popup__close' type='button' onClick={handleClose} />
        {isSuccess ? (
          <div
            className='popup__warning-image'
            style={{ backgroundImage: `url(${okImage})` }}
          />
        ) : (
          <div
            className='popup__warning-image'
            style={{ backgroundImage: `url(${errorImage})` }}
          />
        )}
        <h2 className='popup__warning'>
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip
