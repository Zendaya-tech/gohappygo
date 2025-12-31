import api from "./Api";

export interface OnboardingLinkResponse {
  url: string;
}

export interface AccountStatusResponse {
  accountId: string | null;
  status: string;
  chargesEnabled: boolean;
  transfersEnabled: boolean;
  detailsSubmitted: boolean;
}

export const getOnboardingLink = async (): Promise<OnboardingLinkResponse> => {
  try {
    const response = await api.get('/stripe/onboarding-link');
    return response.data;
  } catch (error: any) {
    console.error("Error getting onboarding link:", error);
    throw error?.response?.data || error;
  }
};

export const getAccountStatus = async (): Promise<AccountStatusResponse> => {
  try {
    const response = await api.get('/stripe/account-status');
    return response.data;
  } catch (error: any) {
    console.error("Error getting account status:", error);
    throw error?.response?.data || error;
  }
};