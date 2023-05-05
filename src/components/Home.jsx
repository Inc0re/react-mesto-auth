import React, { useState } from 'react'
import { CardsContext } from '../contexts/CardsContext'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Home({ setCurrentUser }) {
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  function handelEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <CardsContext.Provider value={cards}>
        {!isLoading && (
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handelEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        )}
      </CardsContext.Provider>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onPlaceAdd={handleAddPlaceSubmit}
      />
      <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        onClose={closeAllPopups}
        buttonText='Да'
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </>
  )
}

export default Home
