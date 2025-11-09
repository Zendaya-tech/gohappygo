import { useMemo, useState, useEffect } from "react";
import Header from "../components/Header";
import FooterMinimal from "~/components/FooterMinimal";
import ProfileDialog from "../components/common/dialogs/ProfileDialog";
import CreateAnnounceDialog from "~/components/common/dialog/CreateAnnounceDialog";
import CreatePackageDialog from "~/components/common/dialog/CreatePackageDialog";
import { useAuth } from "~/hooks/useAuth";
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
import PropertyCard from "~/components/PropertyCard";
import { getBookmarks, type BookmarkItem } from "~/services/announceService";
import { removeBookmark } from "~/services/bookmarkService";

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
  const [tab, setTab] = useState<
    "waiting_proposal" | "waiting_payment" | "archived"
  >("waiting_proposal");
  const filtered = sampleReservations.filter((r) =>
    tab === "archived" ? r.status === "archived" : r.status === tab
  );
  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setTab("waiting_proposal")}
          className={`text-sm font-semibold ${
            tab === "waiting_proposal"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500"
          }`}
        >
          | Waiting for proposal
        </button>
        <button
          onClick={() => setTab("waiting_payment")}
          className={`text-sm font-semibold ${
            tab === "waiting_payment"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500"
          }`}
        >
          | Waiting for payment
        </button>
        <button
          onClick={() => setTab("archived")}
          className={`text-sm font-semibold ${
            tab === "archived"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500"
          }`}
        >
          | Archived reservations
        </button>
      </div>
      <div className="space-y-4">
        {filtered.map((r) => (
          <ReservationCard key={r.id} reservation={r} />
        ))}
      </div>
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
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          Chargement de vos favoris...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
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

              const id = bookmark.id.toString();
              let name, avatar, location, price, rating, image, weight, departure, type, featured;

              if (isTravel && bookmark.travel) {
                // For travel bookmarks
                name = "Transporteur"; // We don't have user info in travel object
                avatar = "/favicon.ico";
                location = `Vol ${bookmark.travel.flightNumber}`;
                price = bookmark.travel.pricePerKg.toString();
                rating = "4.8";
                image = "/favicon.ico"; // Could use airline logo if available
                weight = `${bookmark.travel.totalWeightAllowance}kg`;
                departure = formatDate(bookmark.travel.departureDatetime);
                type = "transporter" as const;
                featured = true;
              } else if (isDemand && bookmark.demand) {
                // For demand bookmarks
                console.log("errod",bookmark.demandId)
                name = (bookmark.demand.user)? formatName(`${bookmark.demand.user.firstName} ${bookmark.demand.user.lastName}`):"inconnu";
                avatar = (bookmark.demand.user)? bookmark.demand.user.profilePictureUrl || "/favicon.ico":"/favicon.ico";
                const originName = bookmark.demand.originAirport?.name || "";
                const destName = bookmark.demand.destinationAirport?.name || "";
                location = `${originName} → ${destName}`;
                price = bookmark.demand.pricePerKg.toString();
                rating = "4.7";
                image = avatar; // Use user avatar for demands
                weight = `${bookmark.demand.weight}kg`;
                departure = formatDate(bookmark.demand.deliveryDate);
                type = "traveler" as const;
                featured = bookmark.demand.user? bookmark.demand.user.isVerified :false;
              }

              return (
                <div key={id} className="relative">
                  <PropertyCard
                    
                    id={id}
                    name={name!}
                    avatar={avatar!}
                    location={location!}
                    price={price!}
                    rating={rating!}
                    image={image!}
                    featured={featured!}
                    weight={weight}
                    departure={departure}
                    type={type!}
                    isBookmarked={true}
                  />
                  {/* Remove from favorites button */}
                  <button 
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
                  </button>
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

  const profileSections: ProfileSection[] = [
    {
      id: "reservations",
      label: "Mes Réservations",
      icon: <PaperAirplaneIcon className="h-5 w-5" />, // reuse icon
      count: 0,
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
      count: 5,
    },
    {
      id: "reviews",
      label: "Mes Avis",
      icon: <StarIcon className="h-5 w-5" />,
      count: 2,
    },
    {
      id: "travel-requests",
      label: "Mes Demandes de Voyages",
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
      count: 0,
    },
    {
      id: "travels",
      label: "Mes Voyages",
      icon: <PaperAirplaneIcon className="h-5 w-5" />,
      count: 0,
    },
    {
      id: "favorites",
      label: "Mes Favoris",
      icon: <HeartIcon className="h-5 w-5" />,
      count: 3,
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
      count: 0,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "messages":
        return (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex h-[600px]">
              {/* Messages List */}
              <div className="w-1/3 border-r border-gray-200">
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
        // Sample reviews data
        const reviews = [
          {
            id: "rev1",
            travelerName: "Harry",
            travelerAvatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
            route: "Paris ➜ Sydney",
            comment: "A great moment with Harry. Thank you!",
            rating: 5,
            date: "7 Feb 24, 2025",
            verified: true,
          },
          {
            id: "rev2",
            travelerName: "Yaoundé",
            travelerAvatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
            route: "Yaoundé ➜ Marrakech",
            comment: "GoHappyGo is a great plateforme and Harry is so kind!",
            rating: 5,
            date: "5 Jul 25, 2025",
            verified: false,
          },
        ];

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
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      5.0 ({reviews.length} avis)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={review.travelerAvatar}
                            alt={review.travelerName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">
                                {review.route}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Rating stars */}
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <StarIcon
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>

                          {/* Comment */}
                          <p className="text-sm text-gray-700 mb-3">
                            {review.comment}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load more button */}
                <div className="mt-6 text-center">
                  <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    Voir plus d'avis
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case "travel-requests":
        return (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Aucune demande de voyage
                </p>
              </div>
            </div>
          </div>
        );
      case "travels":
        const travels: ProfileTravel[] = [
          {
            id: "t1",
            originCity: "Paris",
            destinationCity: "New-York",
            travelDate: "2024-06-24",
            flightNumber: "XC456Y",
            availableWeightKg: 12,
            pricePerKg: 15,
            verified: true,
            imageUrl: "/images/paris.jpg",
          },
          {
            id: "t2",
            originCity: "Lyon",
            destinationCity: "Tokyo",
            travelDate: "2024-07-02",
            flightNumber: "AF1234",
            availableWeightKg: 6,
            pricePerKg: 18,
            imageUrl: "/images/rencontre2-converted.webp",
          },
        ];
        return (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            {travels.map((t) => (
              <ProfileTravelCard key={t.id} travel={t} />
            ))}
          </div>
        );
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
    <div className=" bg-gray-50">
      <Header />

      <main className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
              {/* Profile Picture */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <nav className="space-y-2">
                {profileSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <span className="text-sm font-medium">
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
                Publier une demande de transport
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <section>
            {/* Section Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
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
