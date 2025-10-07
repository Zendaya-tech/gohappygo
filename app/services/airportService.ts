import api from "./Api";

export type Airport = {
    id: string;
    code: string; // e.g. CDG
    name: string; // e.g. Paris Charles de Gaulle
    city?: string;
    country?: string;
};

export type AirportSearchResponse = {
    items: Airport[];
    nextCursor?: string | null;
};

export async function searchAirports(params: { name: string; cursor?: string; limit?: number }): Promise<AirportSearchResponse> {
    const { name, cursor, limit = 20 } = params;
    const response = await api.get("/airports", { params: { name, cursor, limit } });
    // Backend may return different shapes; normalize to { items, nextCursor }
    const data = response.data;
    if (Array.isArray(data)) {
        return { items: data, nextCursor: null };
    }
    if (data && Array.isArray(data.items)) {
        return { items: data.items, nextCursor: data.nextCursor ?? null };
    }
    return { items: [], nextCursor: null };
}


