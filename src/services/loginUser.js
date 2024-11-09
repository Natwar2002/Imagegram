import axiosInstance from "../helpers/axiosInstance";

export async function loginUser(email, password) {
    try {
        const response = await axiosInstance.post('/user/signin', { email, password });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}