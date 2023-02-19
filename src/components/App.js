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

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((e) => {
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

  const onChange = function () {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header/>
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleCards={setCards}
          cards={cards} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <PopupWithForm name='add-card'
          title='Новое место'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <section className="popup__form-section">
            <input name="name" type="text" onChange={onChange} placeholder="Название" value=""
              className="popup__text popup__text_type_name" required minLength="2" maxLength="30" />
            <span className="popup__error"></span>
          </section>
          <section className="popup__form-section">
            <input name="link" onChange={onChange} type="url" placeholder="Ссылка на картинку" value=""
              className="popup__text popup__text_type_url" required />
            <span className="popup__error"></span>
          </section>
        </PopupWithForm>
        <ImagePopup card={selectedCard}
          onClose={closeAllPopups} />
        <PopupWithForm name='remove-card'
          title='Вы уверены?'
          isOpen={false}
          buttonText='Да' />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUpdateAvatar} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
