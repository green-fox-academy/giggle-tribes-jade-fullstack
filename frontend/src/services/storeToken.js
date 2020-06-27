export function storeToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    const token = localStorage.getItem('token');
    if (token !== null && token !== '') {
        return token;
    } else {
        return null;
    }
}

export function deleteToken() {
    localStorage.removeItem('token');
}