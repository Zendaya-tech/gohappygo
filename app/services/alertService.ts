import api from "./Api";

export interface CreateAlertData {
  alertType?: "DEMAND" | "TRAVEL" | "BOTH";
  departureAirportId: number;
  arrivalAirportId: number;
  travelDateTime?: string;
  flightNumber?: string;
}

export interface Alert {
  id: number;
  alertType: "DEMAND" | "TRAVEL" | "BOTH";
  departureAirportId: number;
  arrivalAirportId: number;
  travelDateTime?: string;
  flightNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  departureAirport?: {
    id: number;
    name: string;
    municipality: string;
    isoCountry: string;
  };
  arrivalAirport?: {
    id: number;
    name: string;
    municipality: string;
    isoCountry: string;
  };
}

export const createAlert = async (alertData: CreateAlertData): Promise<Alert> => {
  try {
    const response = await api.post("/alert", alertData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating alert:", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la création de l'alerte");
  }
};

export const getAlerts = async (): Promise<{ items: Alert[]; meta: any }> => {
  try {
    const response = await api.get("/alert");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching alerts:", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la récupération des alertes");
  }
};

export const deleteAlert = async (id: number): Promise<void> => {
  try {
    await api.delete(`/alert/${id}`);
  } catch (error: any) {
    console.error("Error deleting alert:", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la suppression de l'alerte");
  }
};