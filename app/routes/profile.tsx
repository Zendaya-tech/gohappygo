import { useMemo, useState, useEffect } from "react";
import Header from "../components/Header";
import FooterMinimal from "~/components/FooterMinimal";
import ProfileDialog from "../components/common/dialogs/ProfileDialog";
import CreateAnnounceDialog from "~/components/common/dialog/CreateAnnounceDialog";
import CreatePackageDialog from "~/components/common/dialog/CreatePackageDialog";
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
      alert("Erreur lors de l'acceptation de la demande");
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
      alert("Erreur lors de la finalisation de la demande");
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
          {filtered.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Demande #{request.id}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.currentStatus?.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : request.currentStatus?.status === "ACCEPTED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {request.currentStatus?.status || "En attente"}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Type:</span> {request.requestType}
                    </p>
                    <p>
                      <span className="font-medium">Poids:</span> {request.weight} kg
                    </p>
                    <p>
                      <span className="font-medium">Demandeur:</span>{" "}
                      {request.requester?.firstName} {request.requester?.lastName}
                    </p>
                    {request.travel && (
                      <p>
                        <span className="font-medium">Vol:</span> {request.travel.flightNumber}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Créée le {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {request.currentStatus?.status === "NEGOTIATING" && (
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Accepter
                    </button>
                  )}
                  {request.currentStatus?.status === "ACCEPTED" && (
                    <button
                      onClick={() => handleCompleteRequest(request.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Terminer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response.items || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + parseFloat(review.rating || "0"), 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          Chargement de vos avis...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {reviews.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun avis reçu</p>
            <p className="text-gray-400 text-sm mt-2">
              Les avis de vos voyageurs apparaîtront ici
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Mes Avis ({reviews.length})
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(parseFloat(calculateAverageRating()))
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                {calculateAverageRating()} ({reviews.length} avis)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => {
              const reviewer = review.reviewer;
              const reviewerName = reviewer 
                ? `${reviewer.firstName} ${reviewer.lastName.charAt(0)}.`
                : "Utilisateur";
              const reviewerAvatar = reviewer?.profilePictureUrl || "/favicon.ico";
              const rating = parseFloat(review.rating || "0");

              return (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={reviewerAvatar}
                        alt={reviewerName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {reviewerName}
                          </h4>
                          {review.request?.travel && (
                            <p className="text-xs text-gray-500">
                              Vol {review.request.travel.flightNumber}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Rating stars */}
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Comment */}
                      {review.comment && (
                        <p className="text-sm text-gray-700 mb-3">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const TravelRequestsSection = () => {
  const [demands, setDemands] = useState<DemandTravelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDemands = async () => {
    if (!user?.id) return;
    
    try {
      const response = await getUserDemandsAndTravels(user.id, "demand");
      const items = Array.isArray(response) ? response : response?.items ?? [];
      setDemands(items);
    } catch (error) {
      console.error("Error fetching demands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, [user?.id]);

  const handleDeleteDemand = async (demandId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      return;
    }

    try {
      await deleteDemand(demandId);
      // Refresh the list
      await fetchDemands();
    } catch (error) {
      console.error("Error deleting demand:", error);
      alert("Erreur lors de la suppression de la demande");
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          Chargement de vos demandes...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {demands.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune demande de voyage</p>
            <p className="text-gray-400 text-sm mt-2">
              Créez une demande pour trouver un transporteur
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {demands.map((demand) => (
            <div
              key={demand.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={demand.images?.[0]?.fileUrl || demand.user?.profilePictureUrl || "/favicon.ico"}
                    alt="Demande"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {demand.departureAirport?.name} → {demand.arrivalAirport?.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {demand.deliveryDate && formatDate(demand.deliveryDate)}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Numéro de vol {demand.flightNumber}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                      {demand.weight} Kg
                    </div>
                    <div className="text-gray-700 font-semibold">
                      € {demand.pricePerKg} / Kg
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteDemand(demand.id)}
                      className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TravelsSection = () => {
  const [travels, setTravels] = useState<DemandTravelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTravels = async () => {
    if (!user?.id) return;
    
    try {
      const response = await getUserDemandsAndTravels(user.id, "travel");
      const items = Array.isArray(response) ? response : response?.items ?? [];
      setTravels(items);
    } catch (error) {
      console.error("Error fetching travels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, [user?.id]);

  const handleDeleteTravel = async (travelId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?")) {
      return;
    }

    try {
      await deleteTravel(travelId);
      // Refresh the list
      await fetchTravels();
    } catch (error) {
      console.error("Error deleting travel:", error);
      alert("Erreur lors de la suppression du voyage");
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          Chargement de vos voyages...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {travels.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <PaperAirplaneIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun voyage</p>
            <p className="text-gray-400 text-sm mt-2">
              Publiez une annonce de voyage pour transporter des colis
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {travels.map((travel) => (
            <div
              key={travel.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={travel.images?.[0]?.fileUrl || travel.user?.profilePictureUrl || "/favicon.ico"}
                    alt="Voyage"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {travel.departureAirport?.name} → {travel.arrivalAirport?.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {travel.departureDatetime && formatDate(travel.departureDatetime)}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Numéro de vol {travel.flightNumber}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                      {travel.weightAvailable} Kg
                    </div>
                    <div className="text-gray-700 font-semibold">
                      € {travel.pricePerKg} / Kg
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTravel(travel.id)}
                      className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FavoritesSection = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await getBookmarks();
        setBookmarks(response.items || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const formatName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1].charAt(0)}.`;
    }
    return fullName;
  };

  const handleRemoveBookmark = async (bookmarkType: "TRAVEL" | "DEMAND", itemId: number) => {
    try {
      // Convert to lowercase for API endpoint
      const type = bookmarkType.toLowerCase();
      await removeBookmark(type, itemId);
      // Refresh bookmarks after removal
      const response = await getBookmarks();
      setBookmarks(response.items || []);
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2x p-6">
        <div className="text-center text-gray-500">
          Chargement de vos favoris...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl ">
      {bookmarks.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun favori</p>
            <p className="text-gray-400 text-sm mt-2">
              Ajoutez des annonces à vos favoris pour les retrouver facilement
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Mes Favoris ({bookmarks.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => {
              // Determine if it's a travel or demand
              const isTravel = bookmark.bookmarkType === "TRAVEL" && bookmark.travel;
              const isDemand = bookmark.bookmarkType === "DEMAND" && bookmark.demand;
              
              if (!isTravel && !isDemand) return null;

              // Get the actual item (travel or demand)
              const item: any = isTravel ? bookmark.travel : bookmark.demand;
              if (!item) return null;

              const id = (isTravel ? bookmark.travelId : bookmark.demandId)?.toString() || bookmark.id.toString();
              const name = item.user?.name || "Voyageur";
              const avatar = item.user?.profilePictureUrl|| item.images?.[0]?.fileUrl || "/favicon.ico";
              const originName = item.departureAirport?.name || "";
              const destName = item.arrivalAirport?.name || "";
              const location = `${originName} → ${destName}`;
              const pricePerKg = item.pricePerKg ?? 0;
              const rating = "4.7";
              
              // Pour les voyages (travel), utiliser le logo de la compagnie
              // Pour les demandes (demand), utiliser l'avatar de l'utilisateur
              const image = isTravel 
                ? item.airline?.logoUrl || avatar
                : avatar;
              
              const featured = Boolean(item.user?.isVerified);
              
              // Use weightAvailable for travel type, weight for demand type
              const availableWeight = isTravel 
                ? item.weightAvailable ?? 0
                : item.weight ?? 0;
              
              const departure = item.deliveryDate 
                ? formatDate(item.deliveryDate)
                : undefined;
              
              const airline = item.airline?.name;
              const type = isTravel ? "transporter" : "traveler";

              return (
                <div key={id} className="relative">
                  <TravelCard
                    id={id}
                    name={name}
                    avatar={avatar}
                    location={location}
                    price={`${pricePerKg}`}
                    rating={rating}
                    image={image}
                    featured={featured}
                    weight={availableWeight ? `${availableWeight}kg` : undefined}
                    departure={departure}
                    airline={airline}
                    type={type as any}
                    onRemove={() => handleRemoveBookmark(
                      bookmark.bookmarkType, 
                      isTravel ? bookmark.travelId! : bookmark.demandId!
                    )}
                  />
                  {/* Remove from favorites button */}
                  {/* <button 
                    onClick={() => handleRemoveBookmark(
                      bookmark.bookmarkType, 
                      isTravel ? bookmark.travelId! : bookmark.demandId!
                    )}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Profile() {
  const [activeSection, setActiveSection] = useState<string>("reservations");
  const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);
  const [createAnnounceDialogOpen, setCreateAnnounceDialogOpen] =
    useState<boolean>(false);
  const [createPackageDialogOpen, setCreatePackageDialogOpen] =
    useState<boolean>(false);
  const { user, isAuthenticated } = useAuth();
  const [profileStats, setProfileStats] = useState<any>(null);

  // Fetch profile stats
  useEffect(() => {
    const fetchProfileStats = async () => {
      if (!isAuthenticated) return;
      
      try {
        const { getMe } = await import("~/services/authService");
        const meData = await getMe();
        if (meData?.profileStats) {
          setProfileStats(meData.profileStats);
        }
      } catch (error) {
        console.error("Error fetching profile stats:", error);
      }
    };

    fetchProfileStats();
  }, [isAuthenticated]);

  const profileSections: ProfileSection[] = [
    {
      id: "reservations",
      label: "Mes Réservations",
      icon: <PaperAirplaneIcon className="h-5 w-5" />,
      count: profileStats?.requestsAcceptedCount || 0,
    },
    {
      id: "messages",
      label: "Mes Messages",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      count: 0, // Messages count not in profileStats
    },
    {
      id: "reviews",
      label: "Mes Avis",
      icon: <StarIcon className="h-5 w-5" />,
      count: profileStats?.reviewsReceivedCount || 0,
    },
    {
      id: "travel-requests",
      label: "Mes Demandes de Voyages",
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
      count: profileStats?.demandsCount || 0,
    },
    {
      id: "travels",
      label: "Mes Voyages",
      icon: <PaperAirplaneIcon className="h-5 w-5" />,
      count: profileStats?.travelsCount || 0,
    },
    {
      id: "favorites",
      label: "Mes Favoris",
      icon: <HeartIcon className="h-5 w-5" />,
      count: (profileStats?.bookMarkTravelCount || 0) + (profileStats?.bookMarkDemandCount || 0),
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
      count: profileStats?.transactionsCompletedCount || 0,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "messages":
        return (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row h-auto md:h-[600px]">
              {/* Messages List */}
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 max-h-[300px] md:max-h-none">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Mes Messages</h3>
                </div>
                <div className="overflow-y-auto h-full">
                  {/* Message items */}
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-sm">
                          AD
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Angele D.
                          </p>
                          <span className="text-xs text-gray-500">
                            Il y a 2h
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          Moi-même
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          NS
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Nathalie S.
                          </p>
                          <span className="text-xs text-gray-500">
                            Il y a 1j
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          Merci pour votre aide
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-sm">
                          M
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Moi-même
                          </p>
                          <span className="text-xs text-gray-500">
                            Il y a 2j
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          Nouveau message
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">
                          JB
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Jack B.
                          </p>
                          <span className="text-xs text-gray-500">
                            Il y a 3j
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          Disponible demain
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">
                          SA
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Steve A.
                          </p>
                          <span className="text-xs text-gray-500">
                            Il y a 1sem
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          Parfait, merci !
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-xs">
                        ?
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        À quelle heure arrivez vous à l'aéroport ?
                      </p>
                      <p className="text-xs text-gray-500">En ligne</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {/* Received message */}
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md px-4 py-2 bg-white rounded-lg shadow">
                        <p className="text-sm text-gray-800">
                          À quelle heure arrivez vous à l'aéroport ?
                        </p>
                        <p className="text-xs text-gray-500 mt-1">14:30</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "reservations":
        return (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="mb-4 text-lg font-semibold">Reservations</div>
            <ReservationsSection />
          </div>
        );
      case "reviews":
        return <ReviewsSection />;
      case "travel-requests":
        return <TravelRequestsSection />;
      case "travels":
        return <TravelsSection />;
      case "favorites":
        return <FavoritesSection />;
      case "payments":
        return (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <CurrencyDollarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun paiement</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" bg-white">
      <Header />

      <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-4 md:gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="space-y-4 md:space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 text-center">
              {/* Profile Picture */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 overflow-hidden">
                {isAuthenticated && user?.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={user.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* User Name */}
              {isAuthenticated && user?.name ? (
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {user.name}
                </h3>
              ) : (
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Utilisateur
                </h3>
              )}

              {/* User Bio */}
              {isAuthenticated && user?.bio ? (
                <p className="text-gray-600 text-sm mb-4 italic">
                  "{user.bio}"
                </p>
              ) : (
                <p className="text-gray-500 text-sm mb-4">
                  {isAuthenticated
                    ? "Ajoutez une bio pour vous présenter aux autres utilisateurs"
                    : "Veuillez vous connecter pour accéder à votre profil"}
                </p>
              )}

              {/* Edit Profile Button */}
              <button
                onClick={() => setProfileDialogOpen(true)}
                className="w-full bg-white border border-blue-500 text-blue-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-3 md:p-4">
              <nav className="space-y-1 md:space-y-2">
                {profileSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-2 md:p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="flex-shrink-0">{section.icon}</span>
                      <span className="text-xs md:text-sm font-medium truncate">
                        {section.label}
                      </span>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {section.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setCreateAnnounceDialogOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl font-medium text-sm transition-colors shadow-lg hover:shadow-xl"
              >
                Publier une annonce de voyage
              </button>
              <button
                onClick={() => setCreatePackageDialogOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl font-medium text-sm transition-colors shadow-lg hover:shadow-xl"
              >
                Publier une demande de voyage
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <section>
            {/* Section Title */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                | {profileSections.find((s) => s.id === activeSection)?.label}
              </h1>
            </div>

            {/* Content */}
            {renderContent()}
          </section>
        </div>
      </main>

      {/* Profile Dialog */}
      <ProfileDialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
      />

      {/* Create Announce Dialog */}
      <CreateAnnounceDialog
        open={createAnnounceDialogOpen}
        onClose={() => setCreateAnnounceDialogOpen(false)}
      />

      {/* Create Package Dialog */}
      <CreatePackageDialog
        open={createPackageDialogOpen}
        onClose={() => setCreatePackageDialogOpen(false)}
      />

      <FooterMinimal />
    </div>
  );
}
