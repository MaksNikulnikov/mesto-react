import React from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import PopupWithButton from './PopupWithButton';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

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
    setSelectedCard('');
  }

  return (
    <div className="root">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm name='add-profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
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
          </>
        )} />
      <PopupWithForm name='add-card'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
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
          </>
        )} />
      <ImagePopup card={selectedCard}
        onClose={closeAllPopups} />
      <PopupWithButton name='remove-card'
        title='Вы уверены?'
        isOpen={false} />
      <PopupWithForm name='change-profile-avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={(
          <section className="popup__form-section">
            <input name="link" onChange={onChange} type="url" placeholder="https://somewebsite.com/someimage.jpg" value=""
              className="popup__text popup__text_type_url" required />
            <span className="popup__error"></span>
          </section>
        )} />
    </div>
  );
}

export default App;
