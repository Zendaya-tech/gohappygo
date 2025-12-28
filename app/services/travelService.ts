import api from "./Api";

export interface CreateTravelData {
  description: string;
  flightNumber: string;
  isSharedWeight: boolean;
  isInstant: boolean;
  isAllowExtraWeight: boolean;
  punctualityLevel: boolean; // false = punctual, true = very punctual
  feeForGloomy: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDatetime: string;
  pricePerKg: number;
  currencyId: number;
  totalWeightAllowance: number;
  image1: File;
  image2: File;
}

interface Airline {
  id: number;
  name: string;
  logo: string;
  iata: string;
  icao: string;
}

export const getAirlineFromFlightNumber = async (
  flightNumber: string
): Promise<Airline | null> => {
  try {
    const response = await api.get(
      "/demand-and-travel/airline-from-flight-number",
      {
        params: { flightNumber },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching airline from flight number:", error);
    return null;
  }
};

export const createTravel = async (data: CreateTravelData) => {
  try {
    const formData = new FormData();

    // Add all the form fields
    formData.append("description", data.description);
    formData.append("flightNumber", data.flightNumber);
    formData.append("isSharedWeight", data.isSharedWeight.toString());
    formData.append("isInstant", data.isInstant.toString());
    formData.append("isAllowExtraWeight", data.isAllowExtraWeight.toString());
    formData.append("punctualityLevel", data.punctualityLevel.toString());
    formData.append("feeForGloomy", data.feeForGloomy.toString());
    formData.append("departureAirportId", data.departureAirportId.toString());
    formData.append("arrivalAirportId", data.arrivalAirportId.toString());
    formData.append("departureDatetime", data.departureDatetime);
    formData.append("pricePerKg", data.pricePerKg.toString());
    formData.append("currencyId", data.currencyId.toString());
    formData.append(
      "totalWeightAllowance",
      data.totalWeightAllowance.toString()
    );

    // Add the two required images
    formData.append("image1", data.image1);
    formData.append("image2", data.image2);

    const response = await api.post("/travel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating travel:", error);
    throw error; // Propagate the error instead of returning null
  }
};

export interface UpdateTravelData {
  description?: string;
  flightNumber?: string;
  isSharedWeight?: boolean;
  isInstant?: boolean;
  isAllowExtraWeight?: boolean;
  punctualityLevel?: boolean; // false = punctual, true = very punctual
  feeForGloomy?: number;
  departureAirportId?: number;
  arrivalAirportId?: number;
  departureDatetime?: string;
  pricePerKg?: number;
  currencyId?: number;
  totalWeightAllowance?: number;
  image1?: File;
  image2?: File;
}

export const updateTravel = async (travelId: number, data: UpdateTravelData) => {
  try {
    const formData = new FormData();

    // Add all the form fields that are provided
    if (data.description !== undefined) formData.append("description", data.description);
    if (data.flightNumber !== undefined) formData.append("flightNumber", data.flightNumber);
    if (data.isSharedWeight !== undefined) formData.append("isSharedWeight", data.isSharedWeight.toString());
    if (data.isInstant !== undefined) formData.append("isInstant", data.isInstant.toString());
    if (data.isAllowExtraWeight !== undefined) formData.append("isAllowExtraWeight", data.isAllowExtraWeight.toString());
    if (data.punctualityLevel !== undefined) formData.append("punctualityLevel", data.punctualityLevel.toString());
    if (data.feeForGloomy !== undefined) formData.append("feeForGloomy", data.feeForGloomy.toString());
    if (data.departureAirportId !== undefined) formData.append("departureAirportId", data.departureAirportId.toString());
    if (data.arrivalAirportId !== undefined) formData.append("arrivalAirportId", data.arrivalAirportId.toString());
    if (data.departureDatetime !== undefined) formData.append("departureDatetime", data.departureDatetime);
    if (data.pricePerKg !== undefined) formData.append("pricePerKg", data.pricePerKg.toString());
    if (data.currencyId !== undefined) formData.append("currencyId", data.currencyId.toString());
    if (data.totalWeightAllowance !== undefined) formData.append("totalWeightAllowance", data.totalWeightAllowance.toString());

    // Add images if provided
    if (data.image1) formData.append("image1", data.image1);
    if (data.image2) formData.append("image2", data.image2);

    const response = await api.patch(`/travel/${travelId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating travel:", error);
    throw error;
  }
};
