import { useMemo, useState, useEffect } from "react";
import Header from "../components/Header";
import FooterMinimal from "~/components/FooterMinimal";
import ProfileDialog from "../components/common/dialogs/ProfileDialog";
import CreateAnnounceDialog from "~/components/common/dialog/CreateAnnounceDialog";
import CreatePackageDialog from "~/components/common/dialog/CreatePackageDialog";
import EditAnnounceDialog from "~/components/common/dialog/EditAnnounceDialog";
import EditPackageDialog from "~/components/common/dialog/EditPackageDialog";
import ConfirmCancelDialog from "~/components/common/dialog/ConfirmCancelDialog";
import { useAuth } from "~/hooks/useAuth";
import TravelCard from "~/components/TravelCard";
import {
  StarIcon,
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
  HeartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import ReservationCard, {
  type Reservation,
} from "~/components/common/ReservationCard";
import ProfileTravelCard, {
  type ProfileTravel,
} from "~/components/common/ProfileTravelCard";
import AnnounceCard from "~/components/AnnounceCard";
import { getBookmarks, type BookmarkItem, getDemandAndTravel, getUserDemandsAndTravels, deleteTravel, deleteDemand, type DemandTravelItem } from "~/services/announceService";
import { removeBookmark } from "~/services/bookmarkService";
import { getReviews, type Review } from "~/services/reviewService";
import { getRequests, acceptRequest, completeRequest, type RequestResponse } from "~/services/requestService";

interface ProfileSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

const sampleReservations: Reservation[] = [
  {
    id: "r1",
    originCity: "Paris",
    destinationCity: "New-York",
    travelDate: "2024-06-24",
    flightNumber: "XC456Y",
    weightKg: 18,
    priceEuro: 198,
    status: "waiting_payment",
    imageUrl: "/images/paris.jpg",
  },
  {
    id: "r2",
    originCity: "Paris",
    destinationCity: "New-York",
    travelDate: "2024-06-24",
    flightNumber: "XC456Y",
    weightKg: 5,
    priceEuro: 30,
    status: "waiting_payment",
    imageUrl: "/images/paris.jpg",
  },
  {
    id: "r3",
    originCity: "Paris",
    destinationCity: "New-York",
    travelDate: "2024-06-24",
    flightNumber: "XC456Y",
    weightKg: 15,
    priceEuro: 170,
    status: "waiting_proposal",
    customer: {
      name: "Angele . O",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    },
  },
  {
    id: "r4",
    originCity: "Paris",
    destinationCity: "New-York",
    travelDate: "2024-06-24",
    flightNumber: "XC456Y",
    weightKg: 10,
    priceEuro: 90,
    status: "waiting_proposal",
    customer: {
      name: "Arthur . O",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    },
  },
];

const ReservationsSection = () => {
  const [tab, setTab] = useState<"pending" | "accepted" | "completed">("pending");
  const [requests, setRequests] = useState<RequestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests();
        setRequests(response.items || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (requestId: number) => {
    try {
      await acceptRequest(requestId);
      // Refresh requests
      const response = await getRequests();
      setRequests(response.items || []);
    } catch (error) {
      console.error("Error accepting request:", error);
      setErrorMessage("Erreur lors de l'acceptation de la demande");
    }
  };

  const handleCompleteRequest = async (requestId: number) => {
    try {
      await completeRequest(requestId);
      // Refresh requests
      const response = await getRequests();
      setRequests(response.items || []);
    } catch (error) {
      console.error("Error completing request:", error);
      setErrorMessage("Erreur lors de la finalisation de la demande");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filtered = requests.filter((r) => {
    const status = r.currentStatus?.status?.toUpperCase();
    if (tab === "pending") return status === "NEGOTIATING" || status === "PENDING";
    if (tab === "accepted") return status === "ACCEPTED";
    if (tab === "completed") return status === "COMPLETED";
    return false;
  });

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-8">
        Chargement de vos réservations...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setTab("pending")}
          className={`text-sm font-semibold ${
            tab === "pending"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500"
          }`}
        >
          | En attente
        </button>
        <button
          onClick={() => setTab("accepted")}
          className={`text-sm font-semibold ${
            tab === "accepted"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500"
          }`}
        >
          | Acceptées
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`text-sm font-semibold ${
            tab === "completed"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500"
          }`}
        >
          | Terminées
        </button>
      </div>
      
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Aucune réservation dans cette catégorie
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((request) => {
            const travel = request.travel;
            const requester = request.requester;
            const departureCity = travel?.departureAirport?.city || "Paris";
            const arrivalCity = travel?.arrivalAirport?.city || "New-York";
            const travelDate = travel?.departureDatetime ? formatDate(travel.departureDatetime) : "";
            const flightNumber = travel?.flightNumber || "N/A";
            const weight = request.weight || 0;
            const pricePerKg = typeof travel?.pricePerKg === 'string' ? parseFloat(travel.pricePerKg) : (travel?.pricePerKg || 0);
            const price = (pricePerKg * weight).toFixed(0);
            const requesterName = requester ? `${requester.firstName} ${requester.lastName.charAt(0)}.` : "Utilisateur";
            const requesterAvatar = (requester as any)?.profilePictureUrl || "/favicon.ico";

            return (
              <div
                key={request.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
                  {/* Left Section - Trip Details */}
                  <div className="flex gap-6">
                    {/* Plane Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Trip Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {departureCity} → {arrivalCity}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {travelDate}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Numéro de vol {flightNumber}
                      </p>

                      {/* Weight and Price */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                          {weight} Kg
                        </div>
                        <div className="text-gray-900 font-bold text-lg">
                          € {price}
                        </div>
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
                            <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
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
                  <div className="border-l border-gray-300 pl-6">
                    <h4 className="text-sm font-semibold text-gray-600 mb-4">
                      Customer Details
                    </h4>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={requesterAvatar}
                        alt={requesterName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="font-semibold text-gray-900">
                        {requesterName}
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Error Modal */}
      {errorMessage && (
        <ConfirmCancelDialog
          open={!!errorMessage}
          onClose={() => setErrorMessage(null)}
          onConfirm={() => setErrorMessage(null)}
          title="Erreur"
          message={errorMessage}
          confirmText="OK"
          cancelText=""
          type="danger"
        />
      )}
    </div>
  );
};