import api from "./Api";

export const getReviews = async () => {
    try {
        const response = await api.get(`/reviews`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};