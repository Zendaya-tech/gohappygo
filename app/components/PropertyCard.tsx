import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  addBookmark,
  removeBookmark,
  checkIfBookmarked,
} from "~/services/bookmarkService";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: string;
  image: string;
  featured?: boolean;
  weight?: string;
  departure?: string;
  airline?: string;
  isRequest?: boolean;
  avatar?: string;
  type?: "traveler" | "transporter";
}

export default function PropertyCard({
  id,
  name,
  location,
  price,
  type,
  rating,
  image,
  featured = false,
  weight,
  departure,
  airline,
  isRequest = false,
  avatar,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if item is bookmarked on component mount
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const bookmarkType = type === "transporter" ? "TRAVEL" : "DEMAND";
        const isBookmarked = await checkIfBookmarked(
          bookmarkType,
          parseInt(id)
        );
        setIsFavorite(isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [id, type]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la navigation vers le lien

    if (isLoading) return;

    setIsLoading(true);

    try {
      const bookmarkType = type === "transporter" ? "TRAVEL" : "DEMAND";
      const itemId = parseInt(id);

      if (isFavorite) {
        // Remove bookmark
        await removeBookmark(bookmarkType, itemId);
        setIsFavorite(false);
      } else {
        // Add bookmark
        const bookmarkData: any = {
          bookmarkType: bookmarkType as "TRAVEL" | "DEMAND",
        };

        if (bookmarkType === "TRAVEL") {
          bookmarkData.travelId = itemId;
        } else {
          bookmarkData.demandId = itemId;
        }

        await addBookmark(bookmarkData);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={`/announces/${id}`}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden px-2 py-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-800"
    >
      <div className="relative flex overflow-hidden rounded-2xl bg-gray-100  dark:bg-gray-800 border border-gray-200 h-64 dark:border-gray-800">
        <img
          src={image}
          alt={name}
          className={`${
            type === "transporter"
              ? "max-h-full max-w-full "
              : "object-cover  w-full"
          } m-auto  `}
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-emerald-950/80 text-white px-4 py-1 rounded-full text-xs">
            Vérifié
          </div>
        )}
        {type && (
          <div
            className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
              type === "transporter"
                ? "bg-blue-500/90 text-white"
                : "bg-orange-500/90 text-white"
            }`}
          >
            {type === "transporter" ? "Transporteur" : "Voyageur"}
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFavorite
              ? "bg-red-500/90 text-white"
              : "bg-white/80 dark:bg-gray-900/70 hover:bg-white dark:hover:bg-gray-800"
          }`}
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                isFavorite ? "text-white" : "text-gray-600 dark:text-gray-300"
              }`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
        {airline && <></>}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
          <h3 className="font-semibold text-gray-900 dark:text-white ">
            {name}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {location}
        </p>
        {weight && (
          <p className="text-blue-600 text-sm font-medium mb-2">
            {type === "transporter" ? "Espace disponible" : "Espace demandé"}:{" "}
            {weight}
          </p>
        )}
        {departure && (
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
            Date : {departure}
          </p>
        )}
        {/* {airline && (
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">
            Compagnie: {airline}
          </p>
        )} */}

        {departure && (
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-white">
              {price} € / kg
            </span>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {rating}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
