import api from "./Api";

export interface CreateSupportRequestData {
  email: string;
  message: string;
  supportCategory?: "TECHNICAL" | "BILLING" | "FINANCIAL" | "INFORMATIONAL" | "GENERAL" | "OTHER";
  requesterType?: "VISITOR" | "USER";
}

export interface SupportRequest {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  supportCategory: string;
  priority: string;
  requesterType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportRequestResponse {
  success: boolean;
  data: SupportRequest;
  message: string;
}

export const createSupportRequest = async (data: CreateSupportRequestData): Promise<SupportRequestResponse> => {
  try {
    const response = await api.post("/support", {
      email: data.email,
      message: data.message,
      supportCategory: data.supportCategory || "GENERAL",
      supportRequesterType: data.requesterType || "VISITOR"
    });

    return {
      success: true,
      data: response.data,
      message: "Votre demande de support a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais."
    };
  } catch (error: any) {
    console.error("Error creating support request:", error);
    
    // Handle different error types
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        throw new Error(error.response.data.message.join(", "));
      } else {
        throw new Error(error.response.data.message);
      }
    } else if (error?.response?.status === 400) {
      throw new Error("Données invalides. Veuillez vérifier vos informations.");
    } else if (error?.response?.status === 500) {
      throw new Error("Erreur serveur. Veuillez réessayer plus tard.");
    } else {
      throw new Error("Erreur lors de l'envoi de votre demande. Veuillez réessayer.");
    }
  }
};

export const getSupportRequests = async (): Promise<{ items: SupportRequest[] }> => {
  try {
    const response = await api.get("/support");
    return response.data;
  } catch (error) {
    console.error("Error fetching support requests:", error);
    throw error;
  }
};

export const getSupportRequestById = async (id: number): Promise<SupportRequest> => {
  try {
    const response = await api.get(`/support/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching support request:", error);
    throw error;
  }
};