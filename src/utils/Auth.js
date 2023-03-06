const _baseUrl = 'https://auth.nomoreparties.co/'

const register = function ({ email, password }) {
    return fetch(`${_baseUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
}

const login = function ({ email, password }) {
    return fetch(`${_baseUrl}signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
}

const checkToken = function (jwt) {
    return fetch(`${_baseUrl}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
}

export { register, checkToken, login };