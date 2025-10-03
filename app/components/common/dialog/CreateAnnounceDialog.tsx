import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type StepKey = 1 | 2 | 3 | 4;

type CreateAnnounceInitialValues = {
    departure?: string;
    arrival?: string;
    story?: string;
    kilos?: number;
    pricePerKg?: number;
    lateTax?: number;
    noSmileTax?: number;
    allowExtraGrams?: boolean;
    flightNumber?: string;
    travelDate?: string; // yyyy-mm-dd
    reservationType?: "single" | "shared";
    bookingType?: "instant" | "non-instant";
};

export default function CreateAnnounceDialog({ open, onClose, initialValues }: { open: boolean; onClose: () => void; initialValues?: CreateAnnounceInitialValues }) {
    const [step, setStep] = useState<StepKey>(1);
    const { t } = useTranslation();
    // Form state
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [story, setStory] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [kilos, setKilos] = useState<number | "">("");
    const [pricePerKg, setPricePerKg] = useState<number | "">("");
    const [lateTax, setLateTax] = useState<number | "">(0);
    const [noSmileTax, setNoSmileTax] = useState<number | "">(0);
    const [allowExtraGrams, setAllowExtraGrams] = useState<boolean>(false);
    // Supplementary info for Step 1
    const [flightNumber, setFlightNumber] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [reservationType, setReservationType] = useState<"single" | "shared">("single");
    const [bookingType, setBookingType] = useState<"instant" | "non-instant">("instant");

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        setStep(1);
    }, [open]);

    // Prefill when dialog opens or initial values change
    useEffect(() => {
        if (!open) return;
        if (!initialValues) return;
        setDeparture(initialValues.departure ?? "");
        setArrival(initialValues.arrival ?? "");
        setStory(initialValues.story ?? "");
        setKilos(initialValues.kilos ?? "");
        setPricePerKg(initialValues.pricePerKg ?? "");
        setLateTax(initialValues.lateTax ?? 0);
        setNoSmileTax(initialValues.noSmileTax ?? 0);
        setAllowExtraGrams(initialValues.allowExtraGrams ?? false);
        setFlightNumber(initialValues.flightNumber ?? "");
        setTravelDate(initialValues.travelDate ?? "");
        setReservationType(initialValues.reservationType ?? "single");
        setBookingType(initialValues.bookingType ?? "instant");
    }, [open, initialValues]);


    const canNext = useMemo(() => {
        if (step === 1) return Boolean(departure) && Boolean(arrival);
        if (step === 2) return files.length >= 2;
        if (step === 3) return Boolean(kilos) && Boolean(pricePerKg);
        return true;
    }, [step, departure, arrival, files.length, kilos, pricePerKg]);

    const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files ? Array.from(e.target.files) : [];
        setFiles(prevFiles => {
            const remainingSlots = Math.max(0, 2 - prevFiles.length);
            const filesToAdd = selected.slice(0, remainingSlots);
            return [...prevFiles, ...filesToAdd];
        });

        // Create preview URLs for new images up to the cap
        setFileUrls(prevUrls => {
            const remainingSlots = Math.max(0, 2 - prevUrls.length);
            const urlsToAdd = selected.slice(0, remainingSlots).map(file => URL.createObjectURL(file));
            return [...prevUrls, ...urlsToAdd];
        });

        // Reset the input value to allow selecting the same file again
        e.target.value = '';
    };

    const removeFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setFileUrls(prevUrls => {
            // Revoke the URL to free memory
            URL.revokeObjectURL(prevUrls[index]);
            return prevUrls.filter((_, i) => i !== index);
        });
    };


    if (!open) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/35" onClick={onClose} />

            {/* Dialog container */}
            <div className="relative z-10 mt-10 w-full max-w-6xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 max-h-[85vh] flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-0 flex-1">
                    {/* Sidebar steps */}
                    <aside className="border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
                        <StepsNav step={step} />
                    </aside>

                    {/* Content */}
                    <section className="p-6 overflow-y-auto min-h-0">
                        <header className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white"><span className="uppercase">{t('dialogs.createAnnounce.title')}</span> - Step {step} of 4</h2>
                        </header>

                        {step === 1 && (
                            <div className="space-y-6">
                                <Field label="Select your airport of departure">
                                    <input
                                        value={departure}
                                        onChange={(e) => setDeparture(e.target.value)}
                                        placeholder="Choose airport"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label="Select your airport of arrival">
                                    <input
                                        value={arrival}
                                        onChange={(e) => setArrival(e.target.value)}
                                        placeholder="Choose airport"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>

                                <Field label="Numéro de Vol">
                                    <input
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value)}
                                        placeholder="Add numero de vol sur votre billet d’avion"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                                <Field label="Tell a bit more  about your travel">
                                    <textarea
                                        value={story}
                                        onChange={(e) => setStory(e.target.value)}
                                        rows={5}
                                        placeholder="Type here..."
                                        className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <div className="mt-1 text-xs text-gray-400">Max 500 characters</div>
                                </Field>
                                <div>
                                    <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">What kind of reservation do you prefer?</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            <input type="radio" checked={reservationType === 'single'} onChange={() => setReservationType('single')} />
                                            All my kilos for one person
                                        </label>
                                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            <input type="radio" checked={reservationType === 'shared'} onChange={() => setReservationType('shared')} />
                                            Shared kilo with differents traveller
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">What kind of booking do you prefer for this  travel?</div>
                                    <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                                        <label className="inline-flex items-center gap-2">
                                            <input type="radio" checked={bookingType === 'instant'} onChange={() => setBookingType('instant')} />
                                            Instant
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <input type="radio" checked={bookingType === 'non-instant'} onChange={() => setBookingType('non-instant')} />
                                            Non-instant
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <p className="text-gray-700 dark:text-gray-300 font-medium">Upload at least 2 pictures about your travel</p>
                                <label className="block cursor-pointer rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={onFilesSelected} disabled={files.length >= 2} />
                                    Click to upload files ({files.length}/2)
                                </label>
                                {files.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {files.map((f, idx) => (
                                            <div key={idx} className="relative rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
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
                                                    <div className="text-xs text-gray-600 dark:text-gray-300 truncate">{f.name}</div>
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
                                        onChange={(e) => setKilos(e.target.value === "" ? "" : Number(e.target.value))}
                                        placeholder="Enter number of kilos"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label="What is your price per kilos?">
                                    <input
                                        type="number"
                                        min={0}
                                        value={pricePerKg}
                                        onChange={(e) => setPricePerKg(e.target.value === "" ? "" : Number(e.target.value))}
                                        placeholder="enter  your price per kilos"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label={<span>Taxe pour les personnes en retard % <span className="text-gray-400">(juste pour préciser à quel point vous êtes ponctuel)</span></span>}>
                                    <input
                                        type="number"
                                        min={0}
                                        value={lateTax as number}
                                        onChange={(e) => setLateTax(e.target.value === "" ? "" : Number(e.target.value))}
                                        placeholder="0"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label={<span>Taxe pour les personnes pas souriantes ? <span className="text-gray-400">( parce que vous êtes  heureux de rencontrer des personnes heureuses)</span></span>}>
                                    <input
                                        type="number"
                                        min={0}
                                        value={noSmileTax as number}
                                        onChange={(e) => setNoSmileTax(e.target.value === "" ? "" : Number(e.target.value))}
                                        placeholder="0"
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <div>
                                    <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Tolérez vous quelques grammes de trop ?</div>
                                    <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                                        <label className="inline-flex items-center gap-2">
                                            <input type="radio" checked={allowExtraGrams} onChange={() => setAllowExtraGrams(true)} />
                                            Yes
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <input type="radio" checked={!allowExtraGrams} onChange={() => setAllowExtraGrams(false)} />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                <p className="text-gray-700 dark:text-gray-300 font-medium">Setting up payments</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Account holder name">
                                        <input className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
                                    </Field>
                                    <Field label="Payment email (Stripe)">
                                        <input type="email" className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="name@email.com" />
                                    </Field>
                                </div>
                                <Field label="IBAN / Bank account">
                                    <input className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="FR76...." />
                                </Field>
                            </div>
                        )}

                        {/* Footer actions */}
                        <div className="mt-10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    className="rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={() => (step > 1 ? setStep((s) => (Math.max(1, (s - 1) as StepKey) as StepKey)) : onClose())}
                                >
                                    ‹ Back
                                </button>
                                <button className="text-sm text-gray-500">Save as unfinished</button>
                            </div>
                            {step < 4 ? (
                                <button
                                    disabled={!canNext}
                                    onClick={() => setStep((s) => ((s + 1) as StepKey))}
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white ${canNext ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"}`}
                                >
                                    Next ›
                                </button>
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                >
                                    Publish
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
    const Item = ({ index, title, subtitle }: { index: StepKey; title: string; subtitle: string }) => (
        <div className="flex items-start gap-3 py-4">
            <div className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border ${index <= step ? "border-green-500 text-green-600" : "border-gray-300 text-gray-400"}`}>
                {index <= step ? (
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ) : (
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                )}
            </div>
            <div>
                <div className={`text-base font-semibold ${index <= step ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>{title}</div>
                <div className="text-sm text-gray-400">{subtitle}</div>
            </div>
        </div>
    );

    return (
        <div>
            <Item index={1} title="General" subtitle="Select basic settings" />
            <div className="ml-2 h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <Item index={2} title="Pictures" subtitle="Add 2 photos" />
            <div className="ml-2 h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <Item index={3} title="Price & Booking" subtitle="Specify your preferences" />
            <div className="ml-2 h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <Item index={4} title="Payments" subtitle="Setting up payments" />
        </div>
    );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">{label}</label>
            {children}
        </div>
    );
}


