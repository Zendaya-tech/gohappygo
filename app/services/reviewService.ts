import api from "./Api";

export interface ReviewUser {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
}

export interface ReviewRequestStatus {
  status: string;
}

export interface ReviewTravel {
  id: number;
  flightNumber: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDatetime: string;
  status: string;
}

export interface ReviewRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
  demandId?: number;
  travelId?: number;
  requesterId: number;
  requestType: string;
  weight: string;
  currentStatusId?: number;
  currentStatus?: ReviewRequestStatus;
  travel?: ReviewTravel;
  demand?: any;
}

export interface Review {
  id: number;
  createdAt: string;
  updatedAt: string;
  reviewerId: number;
  revieweeId: number;
  requestId: number;
  rating: string;
  comment: string;
  request?: ReviewRequest;
  reviewer?: ReviewUser;
  reviewee?: ReviewUser;
}

export interface PaginatedReviews {
  items: Review[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export const getReviews = async (asReviewer?: boolean): Promise<PaginatedReviews> => {
  try {
    const params = asReviewer ? { asReviewer: 'true' } : {};
    const response = await api.get('/review', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      items: [],
      meta: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };
  }
};
