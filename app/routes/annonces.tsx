import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import FooterMinimal from "~/components/FooterMinimal";
import PropertyCard from "~/components/PropertyCard";
import SearchFiltersBar from "~/components/SearchFiltersBar";
import { getRandomQuotes, type Quote } from "../services/quotesService";
import { getDemandAndTravel } from "~/services/announceService";

export default function Annonces() {
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "verified",
  ]);
  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    from: urlParams.get("from") || "",
    to: urlParams.get("to") || "",
    date: urlParams.get("date") || new Date().toISOString().slice(0, 10),
    flight: urlParams.get("flight") || "",
  });
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesError, setQuotesError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const filters = [
    { id: "verified", label: "Profil vérifié" },
    { id: "lowest-price", label: "Prix le plus bas" },
    { id: "airline", label: "Compagnie aérienne" },
    { id: "travel-date", label: "Date du voyage" },
    { id: "travel-ad", label: "Annonce de voyage" },
    { id: "transport-request", label: "Demande de Transport" },
  ];
  // Fetch from API when URL changes
  useEffect(() => {
    const controller = new AbortController();
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiRes = await getDemandAndTravel({
          originAirportId: urlParams.get("from") || undefined,
          destinationAirportId: urlParams.get("to") || undefined,
          travelDate: urlParams.get("date") || undefined,
          flightNumber: urlParams.get("flight") || undefined,
        });
        const items = Array.isArray(apiRes) ? apiRes : apiRes?.items ?? [];
        setResults(items);
      } catch (e: any) {
        setError(e?.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
    return () => controller.abort();
  }, [location.search, urlParams]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 relative">
      <Header />

      <main className=" mx-auto relative max-w-7xl py-8 px-4">
        {/* Search Bar */}

        <div className="sticky bg-white  z-14 top-15 pt-10  left-0 w-full">
          <SearchFiltersBar
            initialFrom={searchParams.from}
            initialTo={searchParams.to}
            // initialDate={new Date().toISOString().slice(0, 10)}
            initialFlight={searchParams.flight}
            initialWeight={0}
            onChange={(f) =>
              setSearchParams({
                from: f.from,
                to: f.to,
                date: f.date,
                flight: f.flight,
              })
            }
          />
        </div>

        {/* Main Content with Filters and Results */}
        <div className="flex  gap-8 mt-10 ">
          {/* Left Sidebar - Filters */}
          <div className="w-64 fixed flex-shrink-0  top-64 xl:left-1/12  lg:left-10  ">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6  border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
                  Filtrer par
                </button>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  tout effacer
                </button>
              </div>

              {/* Filtrer non disponible button */}
              <div className="mb-4">
                <button className="w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  Filtrer non disponible
                </button>
              </div>

              <div className="space-y-3">
                {filters.map((filter) => (
                  <label
                    key={filter.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.id)}
                      onChange={() => handleFilterChange(filter.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {filter.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Results Grid */}
          <div className="w-[calc(100%-256px)] ml-64 ">
            {loading && (
              <div className="text-sm text-gray-500">Chargement…</div>
            )}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {!loading && !error && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                {/* Empty state illustration */}
                <div className="mb-8">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    className="text-blue-500"
                  >
                    {/* Suitcase body */}
                    <rect
                      x="25"
                      y="45"
                      width="70"
                      height="50"
                      rx="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Suitcase handle */}
                    <path
                      d="M45 45V35C45 30 48 27 53 27H67C72 27 75 30 75 35V45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Suitcase lock */}
                    <rect
                      x="57"
                      y="60"
                      width="6"
                      height="8"
                      rx="1"
                      fill="currentColor"
                    />
                    {/* Sad face */}
                    <circle cx="50" cy="75" r="2" fill="currentColor" />
                    <circle cx="70" cy="75" r="2" fill="currentColor" />
                    <path
                      d="M45 85C45 85 52 80 60 80C68 80 75 85 75 85"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Empty state text */}
                <div className="text-center max-w-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Nous n'avons trouvé aucun bagage disponible
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                    pour ce vol... encore !
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Activez une alerte, nous vous préviendrons
                    <br />
                    dès qu'une offre correspond.
                  </p>

                  {/* Alert button */}
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Activer une alerte
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((item: any) => {
                  // Try to map generic API fields to card fields; adjust as needed
                  const id =
                    item.id || item._id || Math.random().toString(36).slice(2);
                  const name =
                    item.user?.name ||
                    item.traveler?.name ||
                    item.title ||
                    "Voyageur";
                  const avatar =
                    item.user?.avatar ||
                    item.traveler?.avatar ||
                    "/favicon.ico";
                  const originName =
                    item.departureAirport?.name ||
                    item.origin?.name ||
                    item.originAirport?.name ||
                    item.originAirportName ||
                    item.originCity ||
                    "";
                  const destName =
                    item.arrivalAirport?.name ||
                    item.destination?.name ||
                    item.destinationAirport?.name ||
                    item.destinationAirportName ||
                    item.destinationCity ||
                    "";
                  const route = `${originName} - ${destName}`;
                  const pricePerKg = item.pricePerKg ?? item.price ?? 0;
                  const rating = (
                    item.rating ??
                    item.user?.rating ??
                    4.7
                  ).toString();
                  const image = avatar;
                  const featured = Boolean(
                    item.user?.verified || item.traveler?.verified
                  );
                  // Pour les travels (transporteurs), utiliser weightAvailable
                  // Pour les demands (voyageurs), utiliser weight
                  const availableWeight =
                    item.type === "travel"
                      ? item.weightAvailable ??
                        item.availableWeight ??
                        item.maxWeight ??
                        0
                      : item.weight ?? 0;
                  // Pour les travels, utiliser deliveryDate, pour les demands utiliser travelDate
                  const departureDateRaw =
                    item.type === "travel"
                      ? item.deliveryDate ||
                        item.departureDate ||
                        item.travelDate
                      : item.deliveryDate ||
                        item.travelDate ||
                        item.departureDate;
                  const departure = departureDateRaw
                    ? formatDate(departureDateRaw)
                    : undefined;
                  const airline =
                    item.airline?.name || item.airlineLogo || item.airline;
                  const type =
                    item.type === "travel"
                      ? "transporter"
                      : item.type === "demand"
                      ? "traveler"
                      : undefined;

                  return (
                    <PropertyCard
                      key={id}
                      id={id}
                      name={name}
                      avatar={avatar}
                      location={route}
                      price={`${pricePerKg}`}
                      rating={rating}
                      image={image}
                      featured={featured}
                      weight={
                        availableWeight ? `${availableWeight}kg` : undefined
                      }
                      departure={departure}
                      airline={airline}
                      type={type as any}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quotes section (does not change the existing layout) */}
      {(quotes.length > 0 || quotesError) && (
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quotesError && (
              <div className="col-span-full text-sm text-red-600">
                {quotesError}
              </div>
            )}
            {quotes.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"
              >
                <p className="text-gray-800 dark:text-gray-200 text-sm">
                  {q.quote}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {q.author || "Anonyme"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <FooterMinimal />
    </div>
  );
}
