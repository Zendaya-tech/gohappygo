import axios from "axios";

const baseURL =import.meta.env.VITE_API_URL || "https://api.gohappygo.fr/api";


const api = axios.create({
    baseURL,
});

// Attach auth token if present
api.interceptors.request.use((config) => {
    if (typeof document !== "undefined") {
        const match = document.cookie.match(/(?:^|; )auth_token=([^;]+)/);
        const token = match ? decodeURIComponent(match[1]) : null;
        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any)["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;