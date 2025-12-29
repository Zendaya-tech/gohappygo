export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  country: string;
  exchangeRate?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
}

export interface CurrencySearchParams {
  name?: string;
  cursor?: string;
  limit?: number;
}

export interface CurrencyApiResponse {
  items: Currency[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface CurrencySearchResult {
  items: Currency[];
  nextCursor?: string;
}

const API_BASE_URL = "https://api.gohappygo.fr/api/currency";

export async function searchCurrencies(
  params: CurrencySearchParams
): Promise<CurrencySearchResult> {
  const { name = "", cursor, limit = 10 } = params;

  try {
    // Build query parameters
    const searchParams = new URLSearchParams();
    searchParams.append("page", cursor || "1");
    searchParams.append("limit", limit.toString());
    searchParams.append("orderBy", "code:asc");

    if (name.trim()) {
      // The API might support search by name or code
      searchParams.append("search", name.trim());
    }

    const response = await fetch(`${API_BASE_URL}?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CurrencyApiResponse = await response.json();

    // Convert API response to our expected format
    const nextCursor = data.meta.hasNextPage
      ? (data.meta.currentPage + 1).toString()
      : undefined;

    return {
      items: data.items,
      nextCursor,
    };
  } catch (error) {
    console.error("Error fetching currencies:", error);

    // Fallback to some basic currencies if API fails
    const fallbackCurrencies: Currency[] = [
      {
        id: "1",
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        country: "United States of America",
      },
      {
        id: "2",
        code: "EUR",
        name: "Euro",
        symbol: "€",
        country: "European Union",
      },
      {
        id: "3",
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        country: "United Kingdom",
      },
      {
        id: "4",
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        country: "Japan",
      },
      {
        id: "5",
        code: "CAD",
        name: "Canadian Dollar",
        symbol: "C$",
        country: "Canada",
      },
    ];

    // Apply basic filtering for fallback
    let filtered = fallbackCurrencies;
    if (name.trim()) {
      const query = name.toLowerCase();
      filtered = fallbackCurrencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(query) ||
          currency.code.toLowerCase().includes(query) ||
          currency.country.toLowerCase().includes(query)
      );
    }

    return {
      items: filtered,
      nextCursor: undefined,
    };
  }
}

export async function getCurrencyByCode(
  code: string
): Promise<Currency | null> {
  try {
    const response = await fetch(`${API_BASE_URL}?code=${code}&limit=1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CurrencyApiResponse = await response.json();
    return data.items.length > 0 ? data.items[0] : null;
  } catch (error) {
    console.error("Error fetching currency by code:", error);
    return null;
  }
}

export async function getAllCurrencies(): Promise<Currency[]> {
  try {
    const response = await fetch(`${API_BASE_URL}?limit=100&orderBy=code:asc`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CurrencyApiResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching all currencies:", error);

    // Fallback to basic currencies if API fails
    return [
      {
        id: "1",
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        country: "United States of America",
      },
      {
        id: "2",
        code: "EUR",
        name: "Euro",
        symbol: "€",
        country: "European Union",
      },
      {
        id: "3",
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        country: "United Kingdom",
      },
      {
        id: "4",
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        country: "Japan",
      },
      {
        id: "5",
        code: "CAD",
        name: "Canadian Dollar",
        symbol: "C$",
        country: "Canada",
      },
      {
        id: "6",
        code: "AUD",
        name: "Australian Dollar",
        symbol: "A$",
        country: "Australia",
      },
      {
        id: "7",
        code: "CHF",
        name: "Swiss Franc",
        symbol: "CHF",
        country: "Switzerland",
      },
      {
        id: "8",
        code: "CNY",
        name: "Chinese Yuan",
        symbol: "¥",
        country: "China",
      },
    ];
  }
}
