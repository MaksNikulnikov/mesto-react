import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props){
    const {isOpen, onClose, onUpdateAvatar} = props;
    const imgRef = React.useRef('');
    const [value, setValue] = React.useState('');
    const handleChange = function(e){
        setValue(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          link: imgRef.current.value,
        });
      }
    
    return (
        <PopupWithForm name='change-profile-avatar'
              title='Обновить аватар'
              isOpen={isOpen}
              onClose={onClose}
              onSubmit={handleSubmit}>
              <section className="popup__form-section">
                <input name="link" ref = {imgRef} onChange={handleChange} type="url" placeholder="https://somewebsite.com/someimage.jpg" value={value}
                  className="popup__text popup__text_type_url" required />
                <span className="popup__error"></span>
              </section>
            </PopupWithForm>
    )
}

export default EditAvatarPopup
