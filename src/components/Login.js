import AuthorizationForm from "./AuthorizationForm";
import React from "react";

export default function (props) {
    const onSubmit = function (e) {
        e.preventDefault();
        props.onSubmit({ email, password });
        setEmail('');
        setPassword('');
    }
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleEmailChange = function (e) {
        setEmail(e.target.value);
    }
    const handlePasswordChange = function (e) {
        setPassword(e.target.value);
    }

    return (<section className="authorization-form__container">
        <h2 className="authorization-form__title">{'Вход'}</h2>
        <AuthorizationForm
            onSubmit={onSubmit}
            name='login'
            buttonText='Войти'>
            <input name="email"
                onChange={handleEmailChange}
                type="text"
                placeholder="Email"
                value={email || ''}
                className="authorization-form__input"
                required
                minLength="2"
                maxLength="40" />
            <input name="password"
                onChange={handlePasswordChange}
                type="password"
                placeholder="Пароль"
                value={password || ''}
                className="authorization-form__input"
                required
                minLength="2"
                maxLength="40" />
        </AuthorizationForm>
    </section>
    )
}