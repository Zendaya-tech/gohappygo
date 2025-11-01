import { useState } from "react";
import { useNavigate } from "react-router";
import AirportComboBox from "./common/AirportComboBox";
import type { Airport } from "~/services/airportService";

type Props = {
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string; // ISO string yyyy-mm-dd
  initialFlight?: string;
  initialWeight?: number;
  onChange?: (filters: {
    from: string;
    to: string;
    date: string;
    flight: string;
    weight: number;
  }) => void;
};

// Airports are now fetched dynamically via AirportComboBox

export default function SearchFiltersBar({
  initialFrom,
  initialTo,
  initialDate,
  initialFlight = "",
  initialWeight = 0,
  onChange,
}: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );
  const [flight, setFlight] = useState(initialFlight);
  const [weight, setWeight] = useState<number>(initialWeight);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const emit = (
    next?: Partial<{
      from: string;
      to: string;
      date: string;
      flight: string;
      weight: number;
    }>
  ) => {
    if (!onChange) return;
    const payload = { from, to, date, flight, weight, ...(next || {}) } as any;
    onChange(payload);
  };

  const handleSearch = async () => {
    setIsLoading(true);

    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    if (flight) params.set("flight", flight);
    if (typeof weight === "number" && weight > 0)
      params.set("weight", String(weight));

    navigate(`/annonces?${params.toString()}`);
    setIsLoading(false);
  };

  return (
    <div className="bg-white max-w-7xl mx-auto  dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl rounded-r-full px-4 py-4  shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* From */}
        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
          <AirportComboBox
            label="Départ"
            value={from}
            placeholder="Saisir le nom de l'aéroport"
            onChange={(airport: Airport | null) => {
              const code = airport?.id || "";
              setFrom(code);
              emit({ from: code });
            }}
          />
        </div>

        {/* To */}
        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
          <AirportComboBox
            label="Arrivée"
            value={to}
            placeholder="Saisir le nom de l'aéroport"
            onChange={(airport: Airport | null) => {
              const code = airport?.id || "";
              setTo(code);
              emit({ to: code });
            }}
          />
        </div>

        {/* Date */}
        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              console.log(e.target.value);
              emit({ date: e.target.value });
            }}
            className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
          />
        </div>

        {/* Flight */}
        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vol
          </label>
          <input
            type="text"
            value={flight}
            onChange={(e) => {
              setFlight(e.target.value);
              emit({ flight: e.target.value });
            }}
            placeholder="Numéro de vol"
            className="w-full uppercase text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center bg-[url('/images/gribouille.jpg')] rounded-r-full overflow-hidden bg-no-repeat bg-cover bg-center">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`
              relative bg-blue-600 border-8 border-white text-white p-3 rounded-full 
              transition-all duration-300 ease-in-out transform
              ${
                isLoading
                  ? "bg-blue-500 scale-95 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:scale-110 active:scale-95"
              }
              ${isLoading ? "animate-pulse" : "hover:shadow-lg"}
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                {/* Spinning loader */}
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
              </div>
            ) : (
              <span className="text-2xl font-bold transition-transform duration-200">
                GO
              </span>
            )}

            {/* Ripple effect */}
            {!isLoading && (
              <span className="absolute inset-0 rounded-full bg-white opacity-0 transform scale-0 transition-all duration-300 group-active:opacity-20 group-active:scale-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
