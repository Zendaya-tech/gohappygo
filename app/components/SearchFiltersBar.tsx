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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    if (flight) params.set("flight", flight);
    if (typeof weight === "number" && weight > 0)
      params.set("weight", String(weight));
    navigate(`/annonces?${params.toString()}`);
  };

  return (
    <div className="bg-white max-w-7xl mx-auto  dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl rounded-r-full px-4 py-4  shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* From */}
        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
          <AirportComboBox
            label="De"
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
            label="Vers"
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
        <div className="flex items-center justify-center  bg-[url('/images/gribouille.jpg')] rounded-r-full overflow-hidden   bg-no-repeat  bg-cover bg-center ">
          {/* <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">Go</label>
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate block">Trouver un voyageur</span>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button> */}

          <button
            onClick={handleSearch}
            className="bg-blue-600 border-8 border-white text-white p-3 rounded-full hover:bg-blue-700"
          >
            <span className="text-2xl font-bold">GO</span>
          </button>
        </div>
      </div>
    </div>
  );
}
