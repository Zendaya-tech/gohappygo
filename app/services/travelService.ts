import api from "./Api";

export interface CreateTravelData {
  description: string;
  flightNumber: string;
  isSharedWeight: boolean;
  isInstant: boolean;
  isAllowExtraWeight: boolean;
  feeForLateComer: number;
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
    formData.append("feeForLateComer", data.feeForLateComer.toString());
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
