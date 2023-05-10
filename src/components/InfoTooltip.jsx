import okImage from '../images/status-ok.svg'
import errorImage from '../images/status-error.svg'
import Popup from './Popup'

function InfoTooltip({ isSuccess, isOpened, setIsPopupOpened }) {
  function handleClose() {
    setIsPopupOpened(false)
  }

  return (
    <Popup name={'info'} isOpen={isOpened} onClose={handleClose}>
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
    </Popup>
  )
}

export default InfoTooltip
