import Cookies from "js-cookie";

export function setAuthToken(token) {
    console.log(token);
    Cookies.set('authToken', token, { expires: 1 });
}

export function getAuthToken() {
    const token = Cookies.get('authToken');
    return token;
}

export function removeAuthToken() {
    Cookies.remove('authToken');
}