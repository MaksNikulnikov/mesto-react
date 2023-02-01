import { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const { onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick } = props;

    const [userData, setUserData] = useState({
        userName: '',
        userDescription: '',
        userAvatar: '',
    });

    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()]).
            then(([data, cardsData]) => {
                setUserData({
                    userName: data.name,
                    userDescription: data.about,
                    userAvatar: data.avatar,
                });
                setCards(cardsData);
            }).
            catch((e) => {
                console.error(e)
            });
    }, []);

    return (<main className="main">
        <section className="profile">
            <div className="profile__img-container" onClick={onEditAvatar} >
                <img className="profile__image" src={userData.userAvatar} alt="аватар" />
            </div>
            <div className="profile__info">
                <h1 className="profile__title">{userData.userName}</h1>
                <button type="button" onClick={onEditProfile} className="profile__edit-button"></button>
                <p className="profile__subtitle">{userData.userDescription}</p>
            </div>
            <button type="button" onClick={onAddPlace} className="profile__add-button"></button>
        </section>
        <section className="elements">
            <ul className="elements__holder">
                {cards.map((card) => {
                    return (
                        <Card card={card}
                            key={card._id}
                            onCardClick={onCardClick} />
                    )
                })}
            </ul>
        </section>
    </main>);
}

export default Main;