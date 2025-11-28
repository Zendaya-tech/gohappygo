import api from "./Api";

export type Airline = {
  id: number;
  name: string;
  icaoCode: string;
  iataCode: string;
  prefix: string;
  logoUrl: string;
};

export type AirlineSearchResponse = {
  items: Airline[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function searchAirlines(params?: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<AirlineSearchResponse> {
  const { name, page = 1, limit = 10 } = params || {};
  
  const response = await api.get("/airline", {
    params: { name, page, limit },
  });

  const data = response.data;
  
  // Normalize response structure - API returns { items: [...], total, page, limit, totalPages }
  if (data && Array.isArray(data.items)) {
    return {
      items: data.items.map((airline: any) => ({
        id: airline.id,
        name: airline.name,
        icaoCode: airline.icaoCode || "",
        iataCode: airline.iataCode || "",
        prefix: airline.prefix || "",
        logoUrl: airline.logoUrl || "",
      })),
      total: data.total ?? 0,
      page: data.page ?? page,
      limit: data.limit ?? limit,
      totalPages: data.totalPages ?? 1,
    };
  }

  // Fallback if response structure is different
  return {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };
}
