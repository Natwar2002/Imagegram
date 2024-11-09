import axiosInstance from '../helpers/axiosInstance.js'
import { getAuthToken } from '../helpers/cookieUtils.js';

export async function createPost({ image, caption }) {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("image", image); 
    formData.append("caption", caption);
    try {
        const response = await axiosInstance.post('/posts', formData, {
            headers: {
                "x-access-token": token,
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}