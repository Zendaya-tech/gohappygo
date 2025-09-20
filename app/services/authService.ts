import api from "./Api";

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post(`/auth/login`, { email, password });
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await api.post(`/auth/register`, { email, password });
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

