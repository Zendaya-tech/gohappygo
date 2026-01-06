import React from "react";
import {
  getRequests,
  acceptRequest,
  completeRequest,
  type RequestResponse,
} from "~/services/requestService";

// --- Interfaces ---

export interface Airline {
  name?: string;
  logoUrl?: string;
}

export interface TravelData {
  airline?: Airline;
}

export interface RequestStatus {
  status: "NEGOTIATING" | "ACCEPTED" | "COMPLETED" | string;
}

interface TravelRequestCardProps {
  request: RequestResponse;
  travel: TravelData;
  departureCity: string;
  arrivalCity: string;
  travelDate: string;
  flightNumber: string;
  weight: number;
  price: number;
  requesterName: string;
  requesterAvatar: string;
  handleAcceptRequest: (id: number) => void;
  handleCompleteRequest: (id: number) => void;
  handleContactRequester: (name: string, avatar: string) => void;
  handleRejectRequest?: (id: number) => void; // Optional handler for Reject
}

// --- Component ---

const TravelRequestCard: React.FC<TravelRequestCardProps> = ({
  request,
  travel,
  departureCity,
  arrivalCity,
  travelDate,
  flightNumber,
  weight,
  price,
  requesterName,
  requesterAvatar,
  handleAcceptRequest,
  handleCompleteRequest,
  handleContactRequester,
  handleRejectRequest,
}) => {
  return (
    <div
      key={request.id}
      className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
        {/* Left Section - Trip Details */}
        <div className="flex gap-6">
          {/* Airline Logo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
              {travel?.airline?.logoUrl ? (
                <img
                  src={travel.airline.logoUrl}
                  alt={travel.airline.name || "Airline"}
                  className="max-w-full max-h-full w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove(
                      "hidden"
                    );
                  }}
                />
              ) : null}
              <svg
                className={`w-8 h-8 text-blue-600 ${travel?.airline?.logoUrl ? "hidden" : ""}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </div>

          {/* Trip Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {departureCity} → {arrivalCity}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{travelDate}</p>
            <p className="text-sm text-gray-600 mb-4">
              Numéro de vol {flightNumber}
            </p>

            {/* Weight and Price */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-gray-900 font-bold text-lg">{weight} Kg</div>
              <div className="text-gray-900 font-bold text-lg">{price} €</div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {request.currentStatus?.status === "NEGOTIATING" && (
                <>
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectRequest?.(request.id)}
                    className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}

              {request.currentStatus?.status === "ACCEPTED" && (
                <button
                  onClick={() => handleCompleteRequest(request.id)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Terminer
                </button>
              )}

              {request.currentStatus?.status === "COMPLETED" && (
                <span className="px-6 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                  Terminé
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Customer Details */}
        <div className="border-l border-gray-300 pl-6 flex flex-col justify-center min-w-[200px]">
          <h4 className="text-sm font-semibold text-gray-600 mb-4">
            Customer Details
          </h4>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={requesterAvatar}
              alt={requesterName}
              className="w-12 h-12 rounded-full object-cover bg-gray-200"
            />
            <span className="font-semibold text-gray-900">{requesterName}</span>
          </div>
          <button
            className="w-full px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            onClick={() =>
              handleContactRequester(requesterName, requesterAvatar)
            }
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelRequestCard;
