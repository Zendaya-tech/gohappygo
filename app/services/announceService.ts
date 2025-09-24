import api from "./Api";
import { listings } from "~/data/announces";


export const getAnnounce = async (id: string) => {
    try {
        // if(process.env.NODE_ENV === "development") {
            return listings.find((l) => l.id === id);
        // }
        const response = await api.get(`/announces/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

};

export const getAnnounces = async () => {
    try {
        if(process.env.NODE_ENV === "development") {
            return listings;
        }
        const response = await api.get(`/announces`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

export const createAnnounce = async (announce: any) => {
    try {
        const response = await api.post(`/announces`, announce);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};