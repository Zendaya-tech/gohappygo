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

export const register = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string
) => {
    try {
        const response = await api.post(`/auth/register`, {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

export type LoginResponse = {
    access_token: string;
    refresh_token?: string;
    user?: {
        profilePictureUrl?: string;
        id: string | number;
        firstName?: string;
        lastName?: string;
        email?: string;
    };
};

