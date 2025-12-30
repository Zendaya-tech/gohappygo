import api from "./Api";

export interface CreateDemandData {
  flightNumber: string;
  description: string;
  departureAirportId: number;
  arrivalAirportId: number;
  travelDate: string;
  weight: number;
  pricePerKg: number;
  currencyId: number;
  packageKind: string;
  image1: File;
  image2: File;
  image3: File;
}

export const createDemand = async (data: CreateDemandData) => {
  try {
    const formData = new FormData();

    // Add all the form fields
    formData.append("flightNumber", data.flightNumber);
    formData.append("description", data.description);
    formData.append("departureAirportId", data.departureAirportId.toString());
    formData.append("arrivalAirportId", data.arrivalAirportId.toString());
    formData.append("travelDate", data.travelDate);
    formData.append("weight", data.weight.toString());
    formData.append("pricePerKg", data.pricePerKg.toString());
    formData.append("currencyId", data.currencyId.toString());
    formData.append("packageKind", data.packageKind);

    // Add the three required images
    formData.append("image1", data.image1);
    formData.append("image2", data.image2);
    formData.append("image3", data.image3);

    const response = await api.post("/demand", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating demand:", error);
    throw error; // Propagate the error instead of returning null
  }
};

export interface UpdateDemandData {
  flightNumber?: string;
  description?: string;
  departureAirportId?: number;
  arrivalAirportId?: number;
  travelDate?: string;
  weight?: number;
  pricePerKg?: number;
  currencyId?: number;
  packageKind?: string;
}

export const updateDemand = async (demandId: number, data: UpdateDemandData) => {
  try {
    // Send as JSON since the backend PATCH endpoint expects application/json
    const jsonData: any = {};

    // Add all the form fields that are provided
    if (data.flightNumber !== undefined) jsonData.flightNumber = data.flightNumber;
    if (data.description !== undefined) jsonData.description = data.description;
    if (data.departureAirportId !== undefined) jsonData.departureAirportId = data.departureAirportId;
    if (data.arrivalAirportId !== undefined) jsonData.arrivalAirportId = data.arrivalAirportId;
    if (data.travelDate !== undefined) jsonData.travelDate = data.travelDate;
    if (data.weight !== undefined) jsonData.weight = data.weight;
    if (data.pricePerKg !== undefined) jsonData.pricePerKg = data.pricePerKg;
    if (data.currencyId !== undefined) jsonData.currencyId = data.currencyId;
    if (data.packageKind !== undefined) jsonData.packageKind = data.packageKind;

    // Note: Images cannot be updated via PATCH endpoint - only JSON data
    const response = await api.patch(`/demand/${demandId}`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating demand:", error);
    throw error;
  }
};
