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
            initialDate={new Date().toISOString().slice(0, 10)}
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
            {!loading && !error && (
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
