import axiosInstance from '../helpers/axiosInstance.js'
import { getAuthToken } from '../helpers/cookieUtils.js';

export async function deleteLike({ postId: likeableId, onModel }) {
    const token = getAuthToken();
    try {
        const response = await axiosInstance.delete('/likes', { likeableId, onModel }, {
            headers: {
                "x-access-token": token,
            }
        });
        console.log("Unliked:", response.data);
        
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}