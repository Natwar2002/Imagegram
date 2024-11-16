import axiosInstance from '../helpers/axiosInstance.js'
import { getAuthToken } from '../helpers/cookieUtils.js';

export async function getAllCommentsOfAPost(commentableId) {
    const token = getAuthToken();
    try {
        const response = await axiosInstance.get(`/comments/posts/${commentableId}`, {
            headers: {
                "x-access-token": token,
            }
        });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}