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
    type?: "demand" | "travel";
};

export interface Airport {
    name: string;
    municipality: any;
    isoCountry: any;
}

export interface Airline {
    airlineId: number;
    name: string;
    logoUrl: string;
}

export interface User {
    id: number;
    name: string;
    selfieImage: string;
    createdAt: string;
    isVerified: boolean;
}

export interface Image {
    id: number;
    fileUrl: string;
    originalName: string;
    purpose: string;
}

export interface DemandTravelItem {
    id: number;
    type: "demand" | "travel";
    title: string;
    flightNumber: string;
    departureAirportId: number;
    arrivalAirportId: number;
    departureAirport: Airport;
    arrivalAirport: Airport;
    airline: Airline;
    userId: number;
    status: "active" | string;
    deliveryDate: string;
    createdAt: string;
    updatedAt: string;
    weight: number;
    pricePerKg: number;
    weightAvailable: number;
    isDeactivated: boolean;
    packageKind: string;
    isSharedWeight: boolean;
    isInstant: boolean;
    isAllowExtraWeight: boolean;
    feeForLateComer: number;
    feeForGloomy: number;
    user: User;
    images: Image[];
    isBookmarked: boolean;
}

export async function getDemandAndTravel(filters: DemandAndTravelFilters & { page?: number; limit?: number }) {
    const params: Record<string, string | number | undefined> = {};
    if (filters.originAirportId) params.departureAirportId = filters.originAirportId;
    if (filters.destinationAirportId) params.arrivalAirportId = filters.destinationAirportId;
    if (filters.flightNumber) params.flightNumber = filters.flightNumber;
    if (filters.travelDate) params.deliveryDate = filters.travelDate; // Updated to match new structure
    if (typeof filters.minWeight === 'number') params.minWeight = filters.minWeight;
    if (typeof filters.maxWeight === 'number') params.maxWeight = filters.maxWeight;
    if (filters.type) params.type = filters.type;
    if (typeof filters.page === 'number') params.page = filters.page;
    if (typeof filters.limit === 'number') params.limit = filters.limit;

    const response = await api.get(`/demand-and-travel`, { params });
    return response.data; // expected to be { items, meta, ... } structure
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

export const getLatestTravels = async (limit: number = 3) => {
    try {
        const response = await getDemandAndTravel({ 
            type: "travel",
            page: 1, 
            limit 
        });
        const items = Array.isArray(response) ? response : response?.items ?? [];
        return items.slice(0, limit);
    } catch (error) {
        console.error("Error fetching latest travels:", error);
        return [];
    }
};

export const getLatestDemands = async (limit: number = 6) => {
    try {
        const response = await getDemandAndTravel({ 
            type: "demand",
            page: 1, 
            limit 
        });
        const items = Array.isArray(response) ? response : response?.items ?? [];
        return items.slice(0, limit);
    } catch (error) {
        console.error("Error fetching latest demands:", error);
        return [];
    }
};

export interface BookmarkItem {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    bookmarkType: "TRAVEL" | "DEMAND";
    travelId?: number;
    demandId?: number;
    notes?: string;
    travel?: {
        title: string;
        flightNumber: string;
        airline: string;
        departureAirportId: number;
        arrivalAirportId: number;
        departureDatetime: string;
        arrivalDatetime: string;
        pricePerKg: number;
        totalWeightAllowance: number;
    };
    demand?: {
        title: string;
        flightNumber: string;
        description: string;
        departureAirportId: number;
        arrivalAirportId: number;
        deliveryDate: string;
        weight: number;
        pricePerKg: number;
        packageKind: string;
        status: string;
        originAirport: Airport;
        destinationAirport: Airport;
        user: User;
    };
}

export const getBookmarks = async () => {
    try {
        const response = await api.get('/bookmark');
        return response.data; // { items: BookmarkItem[], meta: {} }
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return { items: [], meta: {} };
    }
};