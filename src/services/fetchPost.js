import axiosInstance from '../helpers/axiosInstance.js'

export async function fetchPost(page) {
    const limit = 9;
    try {
        const response = await axiosInstance.get(`/posts?limit=${limit}&offset=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}