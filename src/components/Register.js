import AuthorizationForm from "./AuthorizationForm";
import React from "react";
import { Link } from "react-router-dom";

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
        <h2 className="authorization-form__title">{'Регистрация'}</h2>
        <AuthorizationForm
            onSubmit={onSubmit}
            name='register'
            buttonText='Зарегистрироваться'>
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
        <Link
            className='authorization-form__link-to-login'
            to='/sign-in'>
            Уже зарегистрированы? Войти
        </Link>
    </section>
    )
}