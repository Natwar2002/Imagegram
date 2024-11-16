import axiosInstance from '../helpers/axiosInstance.js'
import { getAuthToken, getUserId } from '../helpers/cookieUtils.js';

export async function createLike({ postId: likeableId, onModel }) {
    const token = getAuthToken();
    try {
        const response = await axiosInstance.post('/likes', { likeableId, onModel }, {
            headers: {
                "x-access-token": token,
            },
        });
        console.log("Like created successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating like:", error.response?.data?.message || error.message);
        throw error;
    }
}