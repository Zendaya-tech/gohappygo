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
        const response = await api.get(`/announces`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

export type DemandAndTravelFilters = {
    originAirportId?: string;
    destinationAirportId?: string;
    flightNumber?: string;
    travelDate?: string; // YYYY-MM-DD
    minWeight?: number;
    maxWeight?: number;
};

export async function getDemandAndTravel(filters: DemandAndTravelFilters & { page?: number; limit?: number }) {
    const params: Record<string, string | number | undefined> = {};
    if (filters.originAirportId) params.departureAirportId = filters.originAirportId;
    if (filters.destinationAirportId) params.arrivalAirportId = filters.destinationAirportId;
    if (filters.flightNumber) params.flightNumber = filters.flightNumber;
    if (filters.travelDate) params.travelDate = filters.travelDate;
    if (typeof filters.minWeight === 'number') params.minWeight = filters.minWeight;
    if (typeof filters.maxWeight === 'number') params.maxWeight = filters.maxWeight;
    if (typeof filters.page === 'number') params.page = filters.page;
    if (typeof filters.limit === 'number') params.limit = filters.limit;

    const response = await api.get(`/demand-and-travel`, { params });
    return response.data; // expected to be { items, total, ... } or array
}

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