import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function CreatePackageDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1: General
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [baggageDescription, setBaggageDescription] = useState("");

    // Step 2: Photos
    const [photos, setPhotos] = useState<File[]>([]);

    // Step 3: Price & Booking
    const [weight, setWeight] = useState("");
    const [pricePerKilo, setPricePerKilo] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [packageNature, setPackageNature] = useState<'fragile' | 'urgent' | 'standard' | 'high-value'>('standard');

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
        setCurrentStep(1);
        setDepartureAirport("");
        setArrivalAirport("");
        setBaggageDescription("");
        setPhotos([]);
        setWeight("");
        setPricePerKilo("");
        setFlightNumber("");
        setTravelDate("");
        setPackageNature('standard');
    }, [open]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        setPhotos(prev => {
            const remainingSlots = Math.max(0, 2 - prev.length);
            const filesToAdd = selectedFiles.slice(0, remainingSlots);
            return [...prev, ...filesToAdd];
        });
        // Reset input so same file can be chosen again after removing
        e.target.value = '';
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const canProceedToNext = () => {
        switch (currentStep) {
            case 1:
                return Boolean(departureAirport) && Boolean(arrivalAirport) && Boolean(baggageDescription);
            case 2:
                return photos.length >= 2;
            case 3:
                return Boolean(weight) && Boolean(pricePerKilo) && Boolean(flightNumber) && Boolean(travelDate);
            default:
                return false;
        }
    };

    const handleSubmit = () => {
        console.log("Form submitted:", {
            departureAirport,
            arrivalAirport,
            baggageDescription,
            photos,
            packageNature,
            weight,
            pricePerKilo,
            flightNumber,
            travelDate
        });
        onClose();
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
                        <StepsNavPackage step={currentStep as 1 | 2 | 3} />
                    </aside>

                    {/* Content */}
                    <section className="p-6 overflow-y-auto min-h-0">
                        <header className="mb-6">
                            {t('dialogs.createPackage.title')}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">   {t('common.step')} {currentStep} {t('common.of')} 3</h2>
                        </header>

                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <Field label={t('dialogs.createAnnounce.departure')}>
                                    <input
                                        value={departureAirport}
                                        onChange={(e) => setDepartureAirport(e.target.value)}
                                        placeholder={t('dialogs.createAnnounce.departure')}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label={t('dialogs.createAnnounce.arrival')}>
                                    <input
                                        value={arrivalAirport}
                                        onChange={(e) => setArrivalAirport(e.target.value)}
                                        placeholder={t('dialogs.createAnnounce.arrival')}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>

                                <Field label={t('dialogs.createAnnounce.flightNumber')}>
                                    <input
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value)}
                                        placeholder={t('dialogs.createAnnounce.flightNumber')}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label={t('dialogs.createAnnounce.travelDate')}>
                                    <input
                                        type="date"
                                        value={travelDate}
                                        onChange={(e) => setTravelDate(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>

                                <Field label={t('dialogs.createAnnounce.story')}>
                                    <textarea
                                        value={baggageDescription}
                                        onChange={(e) => setBaggageDescription(e.target.value)}
                                        rows={5}
                                        placeholder={t('dialogs.createAnnounce.story')}
                                        className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>

                                <div>
                                    <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Nature du colis</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            <input type="radio" checked={packageNature === 'standard'} onChange={() => setPackageNature('standard')} />
                                            Standard
                                        </label>
                                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            <input type="radio" checked={packageNature === 'fragile'} onChange={() => setPackageNature('fragile')} />
                                            Fragile
                                        </label>
                                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            <input type="radio" checked={packageNature === 'urgent'} onChange={() => setPackageNature('urgent')} />
                                            Urgent
                                        </label>
                                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            <input type="radio" checked={packageNature === 'high-value'} onChange={() => setPackageNature('high-value')} />
                                            Valeur supérieure à 3000 €
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <p className="text-gray-700 dark:text-gray-300 font-medium">{t('dialogs.createAnnounce.photos')}</p>
                                <label className="block cursor-pointer rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} disabled={photos.length >= 2} />
                                    {t('common.upload')} ({photos.length}/2)
                                </label>
                                {photos.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {photos.map((photo, idx) => (
                                            <div key={idx} className="relative rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                                <button
                                                    onClick={() => removePhoto(idx)}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10"
                                                    title="Remove image"
                                                >
                                                    −
                                                </button>
                                                <img
                                                    src={URL.createObjectURL(photo)}
                                                    alt={`Preview ${idx + 1}`}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="p-2">
                                                    <div className="text-xs text-gray-600 dark:text-gray-300 truncate">{photo.name}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <Field label={t('dialogs.createAnnounce.weight')}>
                                    <input
                                        type="number"
                                        min={0}
                                        step={0.1}
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder={t('dialogs.createAnnounce.weight')}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                                <Field label={t('dialogs.createAnnounce.pricePerKilo')}>
                                    <input
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={pricePerKilo}
                                        onChange={(e) => setPricePerKilo(e.target.value)}
                                        placeholder={t('dialogs.createAnnounce.pricePerKilo')}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </Field>
                            </div>
                        )}

                        {/* Footer actions */}
                        <div className="mt-10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    className="rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={() => (currentStep > 1 ? prevStep() : onClose())}
                                >
                                    ‹ {t('common.back')}
                                </button>
                                <button className="text-sm text-gray-500">{t('common.save')} {t('common.as')} {t('common.unfinished')}</button>
                            </div>
                            {currentStep < 3 ? (
                                <button
                                    disabled={!canProceedToNext()}
                                    onClick={nextStep}
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white ${canProceedToNext() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"}`}
                                >
                                    {t('common.next')} ›
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!canProceedToNext()}
                                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white ${canProceedToNext() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"}`}
                                >
                                    {t('dialogs.createAnnounce.create')}
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function StepsNavPackage({ step }: { step: 1 | 2 | 3 }) {
    const Item = ({ index, title, subtitle }: { index: 1 | 2 | 3; title: string; subtitle: string }) => (
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
