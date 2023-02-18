import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const { onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick } = props;

    const [cards, setCards] = useState([]);
    const currentUser = React.useContext(CurrentUserContext);
    console.log('currentUser >>',currentUser);

    useEffect(() => {
       api.getCards().
            then((cardsData) => {
                console.log(currentUser);
                setCards(cardsData);
            }).
            catch((e) => {
                console.error(e)
            });
    }, []);

    return (<main className="main">
        <section className="profile">
            <div className="profile__img-container" onClick={onEditAvatar} >
                <img className="profile__image" src={currentUser.avatar} alt="аватар" />
            </div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button type="button" onClick={onEditProfile} className="profile__edit-button"></button>
                <p className="profile__subtitle">{currentUser.about}</p>
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