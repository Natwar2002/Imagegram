import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function setAuthToken(token) {
    Cookies.set('authToken', token, { expires: 1 });
}

export function getAuthToken() {
    const token = Cookies.get('authToken');
    return token;
}

export function removeAuthToken() {
    Cookies.remove('authToken');
}

export function getUserId() {
    const token = getAuthToken();
    const decodedToken = jwtDecode(token);
    return decodedToken._id;
}