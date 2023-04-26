import React from 'react';

export default function ImagePopup({ card, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });

  return (
    <div
      className={`popup popup_bg-opacity_90${card ? ' popup_opened' : ''}`}
      id='picture-popup'
      onClick={handleOverlayClick}
    >
      <figure className='popup__image-figure'>
        <button className='popup__close' type='button' onClick={onClose} />
        <img
          alt={card && card.name}
          className='popup__image'
          src={card && card.link}
        />
        <figcaption className='popup__image-caption'>
          {card && card.name}
        </figcaption>
      </figure>
    </div>
  );
}
