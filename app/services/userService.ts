import api from "./Api";

export const getUser = async (id: string) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

