function PopupWithButton(props) {
    const {title, name, isOpen} = props;
    return (
        <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-btn"></button>
                <h2 className="popup__title">{title}</h2>
                <button type="submit" className="popup__submit-btn">Да</button>
            </div>
        </section>
    );
}

export default PopupWithButton;