import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Route } from "../+types/root";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import FooterMinimal from "~/components/FooterMinimal";
import { ShareIcon } from "@heroicons/react/24/outline";
import BookingDialog from "~/components/common/dialog/BookingDialog";
import MessageDialog from "~/components/common/dialog/MessageDialog";
import ShareDialog from "~/components/common/dialog/ShareDialog";
import CreateAnnounceDialog from "~/components/common/dialog/CreateAnnounceDialog";
import { getAnnounceByIdAndType, type DemandTravelItem } from "~/services/announceService";
import { getRandomQuotes, type Quote } from "~/services/quotesService";

const mockReviews = [
  {
    id: 1,
    rating: 5,
    name: "Jack Black",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment: "Super annonce !",
    fontFamily: "cinzel",
  },
  {
    id: 2,
    rating: 4,
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment:
      "le voyage c'est déroulé sans problème, la livraison a été rapide et le colis a été bien reçu.",
    fontFamily: "sacramento",
  },
  {
    id: 3,
    rating: 5,
    name: "Marie Dubois",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    comment:
      "Excellent service, très professionnel et ponctuel. Je recommande vivement !",
    fontFamily: "playfair",
  },
];

// quotes are fetched dynamically below

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AnnounceDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id") ?? "";
  const type = (searchParams.get("type") as "demand" | "travel") ?? "travel";

  const [listing, setListing] = useState<DemandTravelItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [kilos, setKilos] = useState<number>(0);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [bookOpen, setBookOpen] = useState<boolean>(false);
  const [sliderOpen, setSliderOpen] = useState<boolean>(false);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(0);
  const averageRating =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) /
    mockReviews.length;
  const totalReviews = mockReviews.length;
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesError, setQuotesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnounce = async () => {
      if (!id || !type) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const announce = await getAnnounceByIdAndType(id, type);
        setListing(announce);
      } catch (error) {
        console.error("Error fetching announce:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnounce();
  }, [id, type]);

  useEffect(() => {
    const loadQuotes = async () => {
      const res = await getRandomQuotes();
      if (!res) {
        setQuotesError("Impossible de charger les citations.");
        setQuotes([]);
        return;
      }
      setQuotes(res);
    };
    loadQuotes();
  }, []);

  // Simple gallery to mirror the design
  const galleryImages = useMemo(() => {
    if (!listing) return [];
    const images = listing.images?.map(img => img.fileUrl) || [];
    if (listing.airline?.logoUrl) {
      return [listing.airline.logoUrl, ...images];
    }
    return images;
  }, [listing]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Skeleton loader */}
            <div className="animate-pulse">
              {/* Gallery skeleton */}
              <div className="flex h-[400px] gap-4 mb-6">
                <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                <div className="w-80 flex flex-col gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  {/* User info skeleton */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                    </div>
                  </div>

                  {/* Route info skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                  </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-96"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterMinimal />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Annonce introuvable
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vérifiez l'identifiant ou retournez à la liste des annonces.
            </p>
            <Link
              to="/annonces"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Retour aux annonces
            </Link>
          </div>
        </main>
        <FooterMinimal />
      </div>
    );
  }

  // Pricing calculation similar to the right-hand summary in the mock
  const pricePerKg = listing.pricePerKg || 0;
  const subtotal = kilos * pricePerKg;
  const platformCommission = 0; // can be adjusted later
  const vatRate = 0.24;

  const vat = subtotal * vatRate;
  const insurance = 0;
  const platformTax = 10; // flat example
  const total = Math.max(
    0,
    subtotal + platformCommission + vat + insurance + platformTax
  );

  const availableWeight = type === "travel" ? listing.weightAvailable : listing.weight;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Left: media + traveller + route + description */}
        <div>
          {/* top right small action */}
          <div className="flex items-center justify-end text-sm text-gray-500 mb-3 gap-3">
            <button
              className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600"
              onClick={() => setShareOpen(true)}
            >
              <ShareIcon className="h-4 w-4" />
              Partager
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`inline-flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                isFavorite
                  ? "text-red-500"
                  : "text-gray-500 hover:text-rose-600"
              }`}
            >
              <svg
                className="h-4 w-4 transition-colors duration-200"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              {isFavorite ? "Retirer des favoris" : "Add to favourite"}
            </button>
          </div>

          {/* Gallery with hover effects */}
          <div className="rounded-2xl  overflow-hidden bg-white dark:bg-gray-900">
            <div className="flex h-[400px] gap-4">
              <div className="flex-1">
                <div
                  className="relative w-full h-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer group transition-all duration-300  hover:shadow-lg"
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setSliderOpen(true);
                  }}
                >
                  <img
                    src={
                      type === "travel"
                        ? listing.airline?.logoUrl || "/favicon.ico"
                        : listing.images?.[0]?.fileUrl || "/favicon.ico"
                    }
                    alt="main"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0  bg-black  opacity-0  group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                </div>
              </div>
              <div className="w-80  flex flex-col gap-3">
                {listing.images?.[0] && (
                  <div
                    className="relative flex-1 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => {
                      setCurrentImageIndex(1);
                      setSliderOpen(true);
                    }}
                  >
                    <img
                      src={listing.images[0].fileUrl}
                      alt="thumb-1"
                      className="h-full w-full object-cover transition-transform duration-300 "
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                  </div>
                )}
                {listing.images?.[1] && (
                  <div
                    className="relative flex-1 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => {
                      setCurrentImageIndex(2);
                      setSliderOpen(true);
                    }}
                  >
                    <img
                      src={listing.images[1].fileUrl}
                      alt="thumb-2"
                      className="h-full w-full object-cover transition-transform duration-300 "
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
            <div className=" lg:col-span-2 ">
              {/* Traveller bar */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={listing.user?.profilePictureUrl || "/favicon.ico"}
                    alt={listing.user?.name || "User"}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {listing.user?.name || "Voyageur"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Note 4.7 •{" "}
                      {listing.user?.isVerified ? "Vérifié" : "Non vérifié"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/profile")}
                    className="rounded-lg bg-blue-600 px-5 py-2  font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setMessageOpen(true)}
                    className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-2  font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Message
                  </button>
                </div>
              </div>

              {/* Route line */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 text-sm">
                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-700 dark:text-gray-300">
                    <span className="font-medium">
                      {listing.departureAirport?.name || "Départ"} → {listing.arrivalAirport?.name || "Arrivée"}
                    </span>
                    <span>Départ: {formatDate(listing.departudeDatetime)}</span>
                    <span className="font-medium">
                      Vol N° {listing.flightNumber}
                    </span>
                    <span className="text-blue-600">
                      {type === "travel"
                        ? "Espace disponible"
                        : "Espace demandé"}
                      : {availableWeight}kg
                    </span>
                  </div>
                </div>
                <div className="md:col-span-3 text-left md:text-right">
                  <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    ${listing.pricePerKg}
                    <span className="text-base font-semibold">/Kilo</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {listing.description || "Description non disponible"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Je retourne sur {listing.arrivalAirport?.name} prochainement. Vous
                  pouvez retrouver mes voyages sur la plateforme.
                </p>
              </div>

              {/* Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                {/* <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">✓</span>
                                    accepte qu'une personne pour tous les kilos
                                </div>
                                <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">⏱️</span>
                                    accepte la ponctualité
                                </div> */}
                {/* <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">⚖️</span>
                                    n'accepte pas de grammes en trop
                                </div> */}
              </div>

              {/* Capacity bar */}
              {/* <div className="mt-6 space-y-2">
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                    <div className={`h-full rounded-full ${availableRatio > 0.5 ? "bg-green-500" : availableRatio > 0.2 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${availablePercent}%` }} />
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Capacité restante: {listing.availableWeight}kg / {listing.maxWeight}kg ({availablePercent}%)</div>
                            </div> */}

              {/* Bottom reviews-like section */}
              <div className="mt-14   mb-14">
                {/* <div className="flex items-center justify-between mb-2"> */}
                {/* <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Add a review</h3> */}
                {/* Interactive stars */}
                {/* <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <button
                                                key={i}
                                                onClick={() => setNewRating(i)}
                                                className="p-0.5"
                                                aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                                            >
                                                <svg className={`h-5 w-5 ${i <= newRating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.293z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div> */}
                {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You will not be able to edit your review</p> */}
                {/* <div className="rounded-2xl   flex items-center justify-between gap-3">
                                    <input placeholder="Write your review..." className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <button className="rounded-lg bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700">Post a review</button>
                                </div> */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {mockReviews.length} Comments
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i <= Math.round(averageRating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.293z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-500">
                        ({totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-10 gap-5">
                    {mockReviews.map((review, index) => {
                      return (
                        <div
                          key={review.id}
                          className={`flex items-start gap-3 `}
                        >
                          <img
                            src={review.avatar}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div
                              className={`text-sm text-gray-600 dark:text-gray-400 `}
                            >
                              {review.name} •{" "}
                              {new Date()
                                .toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                                .toUpperCase()}
                            </div>
                            <p
                              className={`mt-1 text-gray-800 dark:text-gray-200 `}
                            >
                              {review.comment}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i <= review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.293z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: booking summary */}
            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                {type === "travel" ? (
                  <>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${listing.pricePerKg}
                      <span className="text-base font-semibold">/Kilo</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                      Prix par kilogramme
                    </div>

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter n° Kilo
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={kilos}
                      onChange={(e) => setKilos(Number(e.target.value))}
                      placeholder="0"
                      className="mb-6 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between text-gray-500">
                        <span>commission plateforme</span>
                        <span>{platformCommission.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-500">
                        <span>TVA 24 %</span>
                        <span>{vat.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-500">
                        <span>Assurance</span>
                        <span>{insurance.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-500">
                        <span>Platform Tax</span>
                        <span>{platformTax.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          Total with taxes
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${total.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {quotesError && (
                      <div className="text-xs text-red-600 mb-2">
                        {quotesError}
                      </div>
                    )}
                    {quotes.map((q, index) => {
                      const fontClass = q.fontFamily
                        ? `font-${q.fontFamily.toLowerCase()}`
                        : "";
                      const isEven = index % 2 === 0;
                      const alignmentClass = isEven ? "ml-auto" : "mr-auto";

                      // Adjust text size based on font family
                      const textSizeClass =
                        q.fontFamily === "sacramento"
                          ? "text-base"
                          : q.fontFamily === "cinzel"
                          ? "text-xs font-medium"
                          : q.fontFamily === "playfair"
                          ? "text-sm"
                          : "text-xs";

                      return (
                        <div
                          key={q.id}
                          className={`text-gray-700 my-4 w-[80%] min-w-52 text-center dark:text-gray-300 max-w-60  ${alignmentClass}`}
                        >
                          <p
                            className={`text-gray-700 dark:text-gray-300 ${fontClass} ${textSizeClass} ${alignmentClass}`}
                          >
                            {"<< " + q.quote + " >>"}
                          </p>
                          <span
                            className={`text-gray-900 text-sm dark:text-gray-300 font-semibold block mt-2 ${alignmentClass}`}
                          >
                            {q.author || "Anonyme"}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}

                {type === "travel" ? (
                  <button
                    onClick={() => setBookOpen(true)}
                    className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-4 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Book now
                  </button>
                ) : (
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-4 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Créer ce voyage
                  </button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      {/* Share Dialog */}
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        listing={{
          title: `Transport ${listing.departureAirport?.name} → ${listing.arrivalAirport?.name}`,
          location: `${listing.departureAirport?.name}, ${listing.arrivalAirport?.name}`,
          rating: 4.7,
          bedrooms: 1,
          beds: 1,
          bathrooms: 1,
          image: listing.user?.profilePictureUrl || "/favicon.ico",
        }}
      />
      {/* Booking Dialog */}
      <BookingDialog
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        amount={total}
        email={"test1@demo.com"}
        onConfirm={() => {
          // Keep existing behavior: confirm sets kilos implicitly by existing input
        }}
      />

      {/* Message Dialog */}
      <MessageDialog
        open={messageOpen}
        onClose={() => setMessageOpen(false)}
        title={`${listing.departureAirport?.name} → ${listing.arrivalAirport?.name}`}
        hostName={listing.user?.name || "Voyageur"}
        hostAvatar={listing.user?.profilePictureUrl || "/favicon.ico"}
        onSend={(msg) => {
          console.log("Message sent:", msg);
        }}
      />

      {/* Create Announce Dialog (prefilled) */}
      <CreateAnnounceDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        initialData={{
          departure: {
            id: listing.departureAirportId?.toString() || "",
            code: "",
            name: listing.departureAirport?.name || "",
            city: listing.departureAirport?.municipality || "",
            country: listing.departureAirport?.isoCountry || "",
          },
          arrival: {
            id: listing.arrivalAirportId?.toString() || "",
            code: "",
            name: listing.arrivalAirport?.name || "",
            city: listing.arrivalAirport?.municipality || "",
            country: listing.arrivalAirport?.isoCountry || "",
          },
          story: listing.description || "",
          kilos: availableWeight,
          pricePerKg: listing.pricePerKg,
          travelDate: (() => {
            try {
              const d = new Date(listing.deliveryDate);
              if (Number.isNaN(d.getTime())) return "";
              return d.toISOString().slice(0, 10);
            } catch {
              return "";
            }
          })(),
          flightNumber: listing.flightNumber,
          reservationType: listing.isSharedWeight ? "shared" : "single",
          bookingType: listing.isInstant ? "instant" : "non-instant",
          allowExtraGrams: listing.isAllowExtraWeight || false,
        }}
      />

      {/* Image Slider Modal */}
      {sliderOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={() => setSliderOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
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

            {/* Previous button */}
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? galleryImages.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === galleryImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Main image */}
            <div className="max-w-4xl overflow-hidden rounded-lg  w-[640px] h-full max-h-[500px] flex items-center justify-center bg-gray-900 dark:bg-gray-800 rounded-lg">
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full w-full h-full object-cover"
              />
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Thumbnail navigation */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-blue-600 dark:bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export const meta: Route.MetaFunction = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "unknown";
  return [
    { title: `Annonce #${id} - GoHappyGo` },
    { name: "description", content: "Détails de l'annonce de transport." },
  ];
};
