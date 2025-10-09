import api from "./Api";

export interface CreateTravelData {
  description: string;
  flightNumber: string;
  airline: string;
  isSharedWeight: boolean;
  isInstant: boolean;
  isAllowExtraWeight: boolean;
  feeForLateComer: number;
  feeForGloomy: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDatetime: string;
  pricePerKg: number;
  totalWeightAllowance: number;
  image1: File;
  image2: File;
}

export const createTravel = async (data: CreateTravelData) => {
  try {
    const formData = new FormData();

    // Add all the form fields
    formData.append("description", data.description);
    formData.append("flightNumber", data.flightNumber);
    formData.append("airline", data.airline);
    formData.append("isSharedWeight", data.isSharedWeight.toString());
    formData.append("isInstant", data.isInstant.toString());
    formData.append("isAllowExtraWeight", data.isAllowExtraWeight.toString());
    formData.append("feeForLateComer", data.feeForLateComer.toString());
    formData.append("feeForGloomy", data.feeForGloomy.toString());
    formData.append("departureAirportId", data.departureAirportId.toString());
    formData.append("arrivalAirportId", data.arrivalAirportId.toString());
    formData.append("departureDatetime", data.departureDatetime);
    formData.append("pricePerKg", data.pricePerKg.toString());
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
    return null;
  }
};
