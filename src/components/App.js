import React from 'react';
import { useState } from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

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

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card){
    const isOwn = card.owner._id === currentUser._id;
    if(isOwn){
      api.deleteCard(card._id)
      .then(response=>{
        if(response.message==="Пост удалён"){
          setCards(cards.filter(item=>item._id!==card._id))
        }
      })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleCards={setCards}
          cards={cards} />
        <Footer />
        <PopupWithForm name='add-profile'
          title='Редактировать профиль'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <section className="popup__form-section">
            <input name="name" onChange={onChange} type="text" placeholder="Имя" value="" className="popup__text popup__text_type_name"
              required minLength="2" maxLength="40" />
            <span className="popup__error"></span>
          </section>
          <section className="popup__form-section">
            <input name="description" onChange={onChange} type="text" placeholder="Вид деятельности" value=""
              className="popup__text popup__text_type_caption" required minLength="2" maxLength="200" />
            <span className="popup__error"></span>
          </section>
        </PopupWithForm>
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
        <PopupWithForm name='change-profile-avatar'
          title='Обновить аватар'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <section className="popup__form-section">
            <input name="link" onChange={onChange} type="url" placeholder="https://somewebsite.com/someimage.jpg" value=""
              className="popup__text popup__text_type_url" required />
            <span className="popup__error"></span>
          </section>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
