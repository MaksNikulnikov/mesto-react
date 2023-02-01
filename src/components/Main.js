import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const { onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick } = props;

    const [state, setState] = React.useState({
        userName: '',
        userDescription: '',
        userAvatar: '',
        cards: []
    });

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()]).
            then(([data, cardsData]) => {
                setState({
                    userName: data.name,
                    userDescription: data.about,
                    userAvatar: data.avatar,
                    cards: cardsData
                });
            })
    }, []);

    return (<main className="main">
        <section className="profile">
            <div className="profile__img-container" onClick={onEditAvatar} >
                <img className="profile__image" src={state.userAvatar} alt="аватар" />
            </div>
            <div className="profile__info">
                <h1 className="profile__title">{state.userName}</h1>
                <button type="button" onClick={onEditProfile} className="profile__edit-button"></button>
                <p className="profile__subtitle">{state.userDescription}</p>
            </div>
            <button type="button" onClick={onAddPlace} className="profile__add-button"></button>
        </section>
        <section className="elements">
            <ul className="elements__holder">
                {state.cards.map((card) => {
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