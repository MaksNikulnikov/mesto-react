import logo from './logo.svg';
import avatar from './images/Avatar.png';


function App() {
  return (
    <div className="root">
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип" />
      </header>
      <main className="main">
        <section className="profile">
          <div className="profile__img-container">
            <img className="profile__image" src={avatar} alt="аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <button type="button" className="profile__edit-button"></button>
            <p className="profile__subtitle">Исследователь океана</p>
          </div>
          <button type="button" className="profile__add-button"></button>
        </section>
        <section className="elements">
          <ul className="elements__holder">
          </ul>
          <template className="element__template">
            <li className="element">
              <article className="element__image-holder">
                <button type="button" className="element__delete"></button>
                <img className="element__image" src="#" alt="" />
                <div className="element__caption">
                  <h2 className="element__title"></h2>
                  <div className="element__heart-container">
                    <button type="button" className="element__heart"></button>
                    <span className="element__heart_counter">1</span>
                  </div>
                </div>
              </article>
            </li>
          </template>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright" lang="en">© 2022 Mesto Russia</p>
      </footer>
      <section className="popup popup_add-profile">
        <div className="popup__container">
          <button type="button" className="popup__close-btn"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form name="formProfile" className="popup__form" noValidate>
            <section className="popup__form-section">
              <input name="name" type="text" placeholder="Имя" value="" className="popup__text popup__text_type_name"
                required minLength="2" maxLength="40" />
              <span className="popup__error"></span>
            </section>
            <section className="popup__form-section">
              <input name="description" type="text" placeholder="Вид деятельности" value=""
                className="popup__text popup__text_type_caption" required minLength="2" maxLength="200" />
              <span className="popup__error"></span>
            </section>
            <button type="submit" className="popup__submit-btn">
              Сохранить
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_add-card">
        <div className="popup__container">
          <button type="button" className="popup__close-btn"></button>
          <h2 className="popup__title">Новое место</h2>
          <form name="formAddCard" className="popup__form" noValidate>
            <section className="popup__form-section">
              <input name="name" type="text" placeholder="Название" value=""
                className="popup__text popup__text_type_name" required minLength="2" maxLength="30" />
              <span className="popup__error"></span>
            </section>
            <section className="popup__form-section">
              <input name="link" type="url" placeholder="Ссылка на картинку" value=""
                className="popup__text popup__text_type_url" required />
              <span className="popup__error"></span>
            </section>
            <button type="submit" className="popup__submit-btn">
              Создать
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_view-image">
        <figure className="popup__container popup__container_for-image">
          <button type="button" className="popup__close-btn"></button>
          <img className="popup__image" src="#" alt="" />
          <figcaption className="popup__figcaption"></figcaption>
        </figure>
      </section>
      <section className="popup popup_remove-card">
        <div className="popup__container">
          <button type="button" className="popup__close-btn"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__submit-btn">Да</button>
        </div>
      </section>
      <section className="popup popup_change-profile-avatar">
        <div className="popup__container">
          <button type="button" className="popup__close-btn"></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form name="formChangeProfileAvatar" className="popup__form" noValidate>
            <section className="popup__form-section">
              <input name="link" type="url" placeholder="https://somewebsite.com/someimage.jpg" value=""
                className="popup__text popup__text_type_url" required />
              <span className="popup__error"></span>
            </section>
            <button type="submit" className="popup__submit-btn">
              Сохранить
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
