import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const handleNameChange = function (e) {
        setName(e.target.value);
    }

    const [link, setLink] = React.useState('');
    const handleLinkChange = function (e) {
        setLink(e.target.value);
    }

    function addNewCard(e) {
        e.preventDefault();
        props.onSubmit({ name, link });
    }

    return (
        <PopupWithForm name='add-card'
            title='Новое место'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={addNewCard}>
            <div className="popup__form-section">
                <input name="name"
                    type="text"
                    onChange={handleNameChange}
                    placeholder="Название"
                    value={name}
                    className="popup__text popup__text_type_name"
                    required
                    minLength="2"
                    maxLength="30" />
                <span className="popup__error"></span>
            </div>
            <div className="popup__form-section">
                <input name="link"
                    onChange={handleLinkChange}
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={link}
                    className="popup__text popup__text_type_url"
                    required />
                <span className="popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;