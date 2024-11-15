import axiosInstance from '../helpers/axiosInstance.js'
import { getAuthToken } from '../helpers/cookieUtils.js';

export async function createComment({ content, onModel, commentableId }) {
    const token = getAuthToken();
    console.log(content, commentableId);
    
    try {
        const response = await axiosInstance.post('/comments', { content, onModel, commentableId }, {
            headers: {
                "x-access-token": token,
            }
        });
        console.log("Comment created successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}