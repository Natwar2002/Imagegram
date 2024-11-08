import Cookies from "js-cookie";

export function setAuthToken(token) {
    Cookies.set('authToken', token, { expires: 1 });
}

export function getAuthToken() {
    return Cookies.get('authToken');
}

export function removeAuthToken() {
    Cookies.remove('authToken');
}