import api from "./Api";

export interface PricingCalculationRequest {
  kilos: number;
  travelId: number;
}

export interface PricingCalculationResponse {
  travelerPayment: number;
  fee: number;
  tvaAmount: number;
  totalAmount: number;
}

export const calculatePricing = async (kilos: number, travelId: number): Promise<PricingCalculationResponse> => {
  try {
    const payload: PricingCalculationRequest = { kilos, travelId };
    const response = await api.post('/platform-pricing/calculate', payload);
    return response.data;
  } catch (error) {
    console.error("Error calculating pricing:", error);
    throw error;
  }
};