import axiosInstance from '../helpers/axiosInstance.js'
import { getAuthToken } from '../helpers/cookieUtils.js';

export async function createComment({ content, onModel, commentableId: postId }) {
    const token = getAuthToken();
    try {
        const response = await axiosInstance.post('/comments', {content, onModel, commentableId: postId}, {
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