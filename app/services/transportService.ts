import api from "./Api";

export interface CreateDemandData {
  flightNumber: string;
  description: string;
  departureAirportId: number;
  arrivalAirportId: number;
  travelDate: string;
  weight: number;
  pricePerKg: number;
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
