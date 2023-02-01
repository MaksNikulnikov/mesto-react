function PopupWithForm(props) {
    const { title, name, isOpen, onClose, children } = props;

    return (
        <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" onClick={onClose} className="popup__close-btn"></button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="popup__form" noValidate>
                    {children}
                    <button type="submit" className="popup__submit-btn">
                        Сохранить
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;