import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createTravel,
  getAirlineFromFlightNumber,
} from "../../../services/travelService";
import AirportComboBox from "../AirportComboBox";
import CurrencyComboBox from "../CurrencyComboBox";
import type { Airport } from "../../../services/airportService";
import type { Currency } from "../../../services/currencyService";

type StepKey = 1 | 2 | 3 | 4;

type InitialData = {
  departure?: Airport | null;
  arrival?: Airport | null;
  story?: string;
  kilos?: number;
  pricePerKg?: number;
  currency?: Currency | null;
  lateTax?: number;
  noSmileTax?: number;
  allowExtraGrams?: boolean;
  flightNumber?: string;
  airline?: any;
  travelDate?: string; // YYYY-MM-DD
  reservationType?: "single" | "shared";
  bookingType?: "instant" | "non-instant";
};

export default function CreateAnnounceDialog({
  open,
  onClose,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  initialData?: InitialData;
}) {
  const [step, setStep] = useState<StepKey>(1);
  const { t } = useTranslation();
  // Form state
  const [departure, setDeparture] = useState<Airport | null>(null);
  const [arrival, setArrival] = useState<Airport | null>(null);
  const [story, setStory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [kilos, setKilos] = useState<number | "">("");
  const [pricePerKg, setPricePerKg] = useState<number | "">("");
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [lateTax, setLateTax] = useState<number | "">(0);
  const [noSmileTax, setNoSmileTax] = useState<number | "">(0);
  const [allowExtraGrams, setAllowExtraGrams] = useState<boolean>(false);
  // Supplementary info for Step 1
  const [flightNumber, setFlightNumber] = useState("");
  const [airline, setAirline] = useState({});
  const [travelDate, setTravelDate] = useState("");
  const [fetchingAirline, setFetchingAirline] = useState(false);
  // API integration state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reservationType, setReservationType] = useState<"single" | "shared">(
    "single"
  );
  const [bookingType, setBookingType] = useState<"instant" | "non-instant">(
    "instant"
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Fetch airline when flight number changes
  useEffect(() => {
    const fetchAirline = async () => {
      if (!flightNumber || flightNumber.length < 2) {
        setAirline("");
        return;
      }

      setFetchingAirline(true);
      try {
        const airlineName = await getAirlineFromFlightNumber(flightNumber);
        if (airlineName) {
          setAirline(airlineName);
        } else {
          setAirline("");
        }
      } catch (error) {
        console.error("Error fetching airline:", error);
        setAirline("");
      } finally {
        setFetchingAirline(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchAirline, 500);
    return () => clearTimeout(timeoutId);
  }, [flightNumber]);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    if (initialData) {
      setDeparture(initialData.departure ?? null);
      setArrival(initialData.arrival ?? null);
      setStory(initialData.story ?? "");
      setKilos(typeof initialData.kilos === "number" ? initialData.kilos : "");
      setPricePerKg(
        typeof initialData.pricePerKg === "number" ? initialData.pricePerKg : ""
      );
      setCurrency(initialData.currency ?? null);
      setLateTax(
        typeof initialData.lateTax === "number" ? initialData.lateTax : 0
      );
      setNoSmileTax(
        typeof initialData.noSmileTax === "number" ? initialData.noSmileTax : 0
      );
      setAllowExtraGrams(Boolean(initialData.allowExtraGrams));
      setFlightNumber(initialData.flightNumber ?? "");
      setAirline(initialData.airline ?? "");
      setTravelDate(initialData.travelDate ?? "");
      setReservationType(initialData.reservationType ?? "single");
      setBookingType(initialData.bookingType ?? "instant");
    } else {
      // Reset all fields when no initial data
      setDeparture(null);
      setArrival(null);
      setStory("");
      setFiles([]);
      setFileUrls([]);
      setKilos("");
      setPricePerKg("");
      setCurrency(null);
      setLateTax(0);
      setNoSmileTax(0);
      setAllowExtraGrams(false);
      setFlightNumber("");
      setAirline("");
      setTravelDate("");
      setReservationType("single");
      setBookingType("instant");
      setSubmitting(false);
      setError(null);
      setSuccess(null);
    }
  }, [open, initialData]);

  const canNext = useMemo(() => {
    if (step === 1) return departure !== null && arrival !== null;
    if (step === 2) return files.length >= 2;
    if (step === 3) return Boolean(kilos) && Boolean(pricePerKg);
    return true;
  }, [step, departure, arrival, files.length, kilos, pricePerKg]);

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => {
      const remainingSlots = Math.max(0, 2 - prevFiles.length);
      const filesToAdd = selected.slice(0, remainingSlots);
      return [...prevFiles, ...filesToAdd];
    });

    // Create preview URLs for new images up to the cap
    setFileUrls((prevUrls) => {
      const remainingSlots = Math.max(0, 2 - prevUrls.length);
      const urlsToAdd = selected
        .slice(0, remainingSlots)
        .map((file) => URL.createObjectURL(file));
      return [...prevUrls, ...urlsToAdd];
    });

    // Reset the input value to allow selecting the same file again
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileUrls((prevUrls) => {
      // Revoke the URL to free memory
      URL.revokeObjectURL(prevUrls[index]);
      return prevUrls.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (files.length < 2) {
      setError("Veuillez ajouter au moins 2 images");
      return;
    }

    if (!departure || !arrival) {
      setError("Veuillez sélectionner les aéroports de départ et d'arrivée");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Convert travelDate to datetime format (assuming departure time)
      const departureDatetime = travelDate
        ? `${travelDate}T12:00:00Z`
        : new Date().toISOString();

      if (!currency) {
        setError("Veuillez sélectionner une devise");
        return;
      }

      const travelData = {
        description: story,
        flightNumber,
        isSharedWeight: reservationType === "shared",
        isInstant: bookingType === "instant",
        isAllowExtraWeight: allowExtraGrams,
        feeForLateComer: typeof lateTax === "number" ? lateTax : 0,
        feeForGloomy: typeof noSmileTax === "number" ? noSmileTax : 0,
        departureAirportId: parseInt(departure.id),
        arrivalAirportId: parseInt(arrival.id),
        departureDatetime,
        pricePerKg: typeof pricePerKg === "number" ? pricePerKg : 0,
        currencyId: parseInt(currency.id),
        totalWeightAllowance: typeof kilos === "number" ? kilos : 0,
        image1: files[0],
        image2: files[1],
      };

      const result = await createTravel(travelData);

      if (result) {
        setSuccess("Annonce de voyage créée avec succès!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(
          "Erreur lors de la création de l'annonce. Veuillez réessayer."
        );
      }
    } catch (err: any) {
      // Check if it's a 401 error (user not authenticated)
      if (err?.response?.status === 401 || err?.status === 401) {
        setError(
          "Vous devez être connecté pour créer une annonce. Veuillez vous connecter."
        );
      } else {
        // Handle validation errors from backend
        if (err?.response?.data?.message) {
          if (Array.isArray(err.response.data.message)) {
            setError(err.response.data.message.join(", "));
          } else {
            setError(err.response.data.message);
          }
        } else {
          setError(
            "Erreur lors de la création de l'annonce. Veuillez réessayer."
          );
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/35" onClick={onClose} />

      {/* Dialog container */}
      <div className="relative z-10 mt-4 md:mt-10 w-full max-w-6xl overflow-hidden rounded-2xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 h-[95vh] md:max-h-[85vh] flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-0 flex-1">
          {/* Sidebar steps */}
          <aside className="border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-4 md:p-6 overflow-y-auto">
            <StepsNav step={step} />
          </aside>

          {/* Content */}
          <section className="p-4 md:p-6 overflow-y-auto min-h-0">
            <header className="mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                <span className="uppercase text-sm md:text-base">
                  {t("dialogs.createAnnounce.title")}
                </span>{" "}
                <span className="text-sm md:text-base">- Step {step} of 4</span>
              </h2>
            </header>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <AirportComboBox
                  label="Select your airport of departure"
                  value={departure?.code}
                  onChange={setDeparture}
                  placeholder="Choose airport"
                />
                <AirportComboBox
                  label="Select your airport of arrival"
                  value={arrival?.code}
                  onChange={setArrival}
                  placeholder="Choose airport"
                />

                <Field label="Numéro de Vol">
                  <input
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="Add numero de vol sur votre billet d’avion"
                    className="w-full rounded-xl uppercase border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Field>
                <Field label="Date de votre Voyage">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    placeholder="Choisir une date"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Field>
                <Field label="Compagnie aérienne">
                  <div className="relative">
                    <input
                      value={airline.name}
                      disabled
                      placeholder={
                        fetchingAirline
                          ? "Recherche en cours..."
                          : flightNumber
                          ? "Détectée automatiquement"
                          : "Entrez d'abord le numéro de vol"
                      }
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                    {fetchingAirline && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="animate-spin h-5 w-5 text-indigo-600"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    La compagnie aérienne est détectée automatiquement à partir
                    du numéro de vol
                  </p>
                </Field>

                <Field label="Tell a bit more  about your travel">
                  <textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    rows={5}
                    placeholder="Type here..."
                    className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="mt-1 text-xs text-gray-400">
                    Max 500 characters
                  </div>
                </Field>
                <div>
                  <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    What kind of reservation do you prefer?
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        checked={reservationType === "single"}
                        onChange={() => setReservationType("single")}
                      />
                      All my kilos for one person
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        checked={reservationType === "shared"}
                        onChange={() => setReservationType("shared")}
                      />
                      Shared kilo with differents traveller
                    </label>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    What kind of booking do you prefer for this travel?
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        checked={bookingType === "instant"}
                        onChange={() => setBookingType("instant")}
                      />
                      Instant
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        checked={bookingType === "non-instant"}
                        onChange={() => setBookingType("non-instant")}
                      />
                      Non-instant
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Upload at least 2 pictures about your travel
                </p>
                <label className="block cursor-pointer rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onFilesSelected}
                    disabled={files.length >= 2}
                  />
                  Click to upload files ({files.length}/2)
                </label>
                {files.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {files.map((f, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                      >
                        <button
                          onClick={() => removeFile(idx)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10"
                          title="Remove image"
                        >
                          −
                        </button>
                        <img
                          src={fileUrls[idx]}
                          alt={`Preview ${f.name}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2">
                          <div className="text-xs text-gray-600 dark:text-gray-300 truncate">
                            {f.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <Field label="How many Kilos do you propose ?">
                  <input
                    type="number"
                    min={0}
                    value={kilos}
                    onChange={(e) =>
                      setKilos(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Enter number of kilos"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Field>
                <Field label="What is your price per kilos?">
                  <div className="flex">
                    <input
                      type="number"
                      min={0}
                      value={pricePerKg}
                      onChange={(e) =>
                        setPricePerKg(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder="enter  your price per kilos"
                      className="flex-1 rounded-l-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-r-0"
                    />
                    <CurrencyComboBox
                      value={currency?.code}
                      onChange={setCurrency}
                      placeholder="EUR"
                      compact
                    />
                  </div>
                </Field>
                <Field
                  label={
                    <span>
                      Taxe pour les personnes en retard{" "}
                      <span className="text-gray-400">
                        (juste pour préciser à quel point vous êtes ponctuel)
                      </span>
                    </span>
                  }
                >
                  <div className="flex">
                    <input
                      type="number"
                      min={0}
                      value={lateTax as number}
                      onChange={(e) =>
                        setLateTax(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder="0"
                      className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {currency && (
                      <div className="ml-3 flex items-center px-3 text-sm text-gray-600 dark:text-gray-400">
                        {currency.code}
                      </div>
                    )}
                  </div>
                </Field>
                <Field
                  label={
                    <span>
                      Taxe pour les personnes pas souriantes{" "}
                      <span className="text-gray-400">
                        ( parce que vous êtes heureux de rencontrer des
                        personnes heureuses)
                      </span>
                    </span>
                  }
                >
                  <div className="flex">
                    <input
                      type="number"
                      min={0}
                      value={noSmileTax as number}
                      onChange={(e) =>
                        setNoSmileTax(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder="0"
                      className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {currency && (
                      <div className="ml-3 flex items-center px-3 text-sm text-gray-600 dark:text-gray-400">
                        {currency.code}
                      </div>
                    )}
                  </div>
                </Field>
                <div>
                  <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Tolérez vous quelques grammes de trop ?
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        checked={allowExtraGrams}
                        onChange={() => setAllowExtraGrams(true)}
                      />
                      Yes
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        checked={!allowExtraGrams}
                        onChange={() => setAllowExtraGrams(false)}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Setting up payments
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Account holder name">
                    <input
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="John Doe"
                    />
                  </Field>
                  <Field label="Payment email (Stripe)">
                    <input
                      type="email"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="name@email.com"
                    />
                  </Field>
                </div>
                <Field label="IBAN / Bank account">
                  <input
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="FR76...."
                  />
                </Field>
              </div>
            )}

            {/* Footer actions */}
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() =>
                    step > 1
                      ? setStep(
                          (s) => Math.max(1, (s - 1) as StepKey) as StepKey
                        )
                      : onClose()
                  }
                >
                  ‹ Back
                </button>
                <button className="text-sm text-gray-500">
                  Save as unfinished
                </button>
              </div>
              {step < 4 ? (
                <button
                  disabled={!canNext}
                  onClick={() => setStep((s) => (s + 1) as StepKey)}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white ${
                    canNext
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Next ›
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white ${
                    submitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {submitting ? "Publication en cours..." : "Publish"}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StepsNav({ step }: { step: StepKey }) {
  const Item = ({
    index,
    title,
    subtitle,
  }: {
    index: StepKey;
    title: string;
    subtitle: string;
  }) => (
    <div className="flex items-start gap-2 md:gap-3 py-2 md:py-4">
      <div
        className={`mt-0.5 md:mt-1 inline-flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full border ${
          index <= step
            ? "border-green-500 text-green-600"
            : "border-gray-300 text-gray-400"
        }`}
      >
        {index <= step ? (
          <svg className="h-2.5 w-2.5 md:h-3 md:w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gray-300"></span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-sm md:text-base font-semibold truncate ${
            index <= step ? "text-gray-900 dark:text-white" : "text-gray-400"
          }`}
        >
          {title}
        </div>
        <div className="text-xs md:text-sm text-gray-400 truncate">{subtitle}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Item index={1} title="General" subtitle="Select basic settings" />
      <div className="ml-1.5 md:ml-2 h-4 md:h-6 w-px bg-gray-200 dark:bg-gray-800" />
      <Item index={2} title="Pictures" subtitle="Add 2 photos" />
      <div className="ml-1.5 md:ml-2 h-4 md:h-6 w-px bg-gray-200 dark:bg-gray-800" />
      <Item
        index={3}
        title="Price & Booking"
        subtitle="Specify your preferences"
      />
      <div className="ml-1.5 md:ml-2 h-4 md:h-6 w-px bg-gray-200 dark:bg-gray-800" />
      <Item index={4} title="Payments" subtitle="Setting up payments" />
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      {children}
    </div>
  );
}
