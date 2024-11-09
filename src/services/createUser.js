import axiosInstance from '../helpers/axiosInstance.js'

export async function createUser({ email, username, password }) {
    try {
        const response = await axiosInstance.post('/user/signup', { email, username, password });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}