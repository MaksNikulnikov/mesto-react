import React from 'react';
import { useState } from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRouter from './ProtectedRouter';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsinfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()]).
      then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      }).catch((e) => {
        console.error(e)
      });
  }, []);

  const handleEditAvatarClick = function () {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = function () {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = function () {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = function (card) {
    setSelectedCard(card);
  }

  const closeAllPopups = function () {
    if (isEditAvatarPopupOpen) {
      setIsEditAvatarPopupOpen(false);
    }
    if (isAddPlacePopupOpen) {
      setIsAddPlacePopupOpen(false);
    }
    if (isEditProfilePopupOpen) {
      setIsEditProfilePopupOpen(false);
    }
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((e) => { console.error(e) });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(response => {
          if (response.message === "Пост удалён") {
            setCards(cards.filter(item => item._id !== card._id))
          }
        })
        .catch((e) => { console.error(e) });
    }
  }

  function handleUpdateUser(userInfo) {
    api.patchUserInfo(userInfo)
      .then(response => {
        setCurrentUser({
          name: response.name,
          about: response.about,
          avatar: response.avatar
        });
        setIsEditProfilePopupOpen(false);
      })
      .catch((e) => { console.error(e) });
  }

  function handleUpdateAvatar(avatar) {
    api.patchUserInfoAvatar(avatar)
      .then(response => {
        setCurrentUser({
          name: response.name,
          about: response.about,
          avatar: response.avatar
        });
        setIsEditAvatarPopupOpen(false);
      })
      .catch((e) => { console.error(e) });
  }
  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard).then(response => {
      setCards([response, ...cards]);
      setIsAddPlacePopupOpen(false);
    })
      .catch((e) => { console.error(e) });
  }

  console.log(loggedIn)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        {/* <Routes>
          <Route path="*"
            element={loggedIn ?
              <Navigate to="/cards" replace /> :
              <Navigate to="/sign-in" replace />} />
          <ProtectedRouter element={Register}
            path="/sign-up" />
          <ProtectedRouter element={Login}
            path="/sign-in" />
          <ProtectedRouter element={Main}
            path="/cards"
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
        </Routes> */}
        <Routes >
          <Route path="*"
            element={loggedIn ?
              <Navigate to="/cards" replace /> :
              <Navigate to="/sign-in" replace />} />

          <Route path="/sign-up"
            element={<ProtectedRouter
              element={Register}
              loggedIn={loggedIn} />} />
          <Route path="/sign-in"
            element={<Login />} />
          <Route path="/cards"
            element={<ProtectedRouter element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn} />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onSubmit={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard}
          onClose={closeAllPopups} />
        <PopupWithForm name='remove-card'
          title='Вы уверены?'
          isOpen={false}
          buttonText='Да' />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltip isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSucced={loggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
