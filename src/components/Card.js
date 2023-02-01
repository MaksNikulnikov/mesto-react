function Card(props) {
    const { card, onCardClick } = props;
    const handleClick = function () {
        onCardClick(card);
    }

    return (
        <li className="element">
            <article className="element__image-holder">
                <button type="button" className="element__delete"></button>
                <img className="element__image" onClick={handleClick} src={card.link} alt={card.name} />
                <div className="element__caption">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__heart-container">
                        <button type="button" className="element__heart"></button>
                        <span className="element__heart_counter">{card.likes.length}</span>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Card;