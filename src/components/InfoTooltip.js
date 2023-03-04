import React from "react";
import success from "../images/success.svg"
import fail from "../images/fail.svg"

export default function (props) {
    const { isOpen, onClose, isSucced } = props;
    const imgRef = React.useRef('');

    return (
        <section className={`popup popup_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button"
                    onClick={onClose}
                    className="popup__close-btn" />
                <img className="popup__info-tooltip-image"
                    src={isSucced ?
                        success :
                        fail}
                    alt="icon"></img>
                <h2 className="popup__title popup__title_info-tooltip">{isSucced ?
                    'Вы успешно зарегистрировались!' :
                    'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </section>
    )
}