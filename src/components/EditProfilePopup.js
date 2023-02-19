import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const { isOpen, onClose, onUpdateUser } = props;
    const [name, setName] = React.useState('');
    const handleNameChange = function (e) {
        setName(e.target.value);
    }
    const [description, setDescription] = React.useState('');
    const handleDescriptionChange = function (e) {
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='add-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <section className="popup__form-section">
                <input name="name" onChange={handleNameChange} type="text" placeholder="Имя" value={name} className="popup__text popup__text_type_name"
                    required minLength="2" maxLength="40" />
                <span className="popup__error"></span>
            </section>
            <section className="popup__form-section">
                <input name="description" onChange={handleDescriptionChange} type="text" placeholder="Вид деятельности" value={description}
                    className="popup__text popup__text_type_caption" required minLength="2" maxLength="200" />
                <span className="popup__error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditProfilePopup;