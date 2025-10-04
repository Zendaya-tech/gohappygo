import api from "./Api";

export type Quote = {
    id: number;
    quote: string;
    author: string | null;
    fontFamily?: string | null;
    fontSize?: string | number | null;
};

export const getRandomQuotes = async (): Promise<Quote[] | null> => {
    try {
        const response = await api.get(`/quotes/random`, { params: { numberOfQuotes: 4 } });
        return response.data as Quote[];
    } catch (error) {
        console.error(error);
        return null;
    }
};


