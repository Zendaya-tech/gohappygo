import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function BookingDialog({
    open,
    onClose,
    pricePerKilo,
    onConfirm
}: {
    open: boolean;
    onClose: () => void;
    pricePerKilo: number;
    onConfirm: (packageData: {
        description: string;
        weight: number;
        deadline?: string;
    }) => void;
}) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1: Package Details
    const [packageDescription, setPackageDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [deadline, setDeadline] = useState("");

    // Step 2: Photos
    const [photos, setPhotos] = useState<File[]>([]);

    // Step 3: Review & Confirm
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            setCurrentStep(1);
            setPackageDescription("");
            setWeight("");
            setDeadline("");
            setPhotos([]);
            setAcceptedTerms(false);
        }
    }, [open]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newPhotos = Array.from(e.target.files);
            setPhotos(prev => [...prev, ...newPhotos]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceedToNext = () => {
        switch (currentStep) {
            case 1:
                return packageDescription && weight;
            case 2:
                return photos.length >= 1; // At least one photo required
            case 3:
                return acceptedTerms;
            default:
                return false;
        }
    };

    const handleSubmit = () => {
        const packageData = {
            description: packageDescription,
            weight: parseFloat(weight),
            deadline: deadline || undefined
        };
        onConfirm(packageData);
        onClose();
    };

    // Calculate pricing
    const subtotal = parseFloat(weight || "0") * pricePerKilo;
    const vatRate = 0.24;
    const vat = subtotal * vatRate;
    const platformTax = 10;
    const total = Math.max(0, subtotal + vat + platformTax);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
            <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Réserver un transport</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Prix: ${pricePerKilo}/kg</p>
                    </div>
                    <button onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Fermer">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
                    </button>
                </div>

                <div className="flex">
                    {/* Left Sidebar - Progress Indicator */}
                    <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-6">
                        <div className="space-y-6">
                            {/* Step 1: Package Details */}
                            <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                    {currentStep > 1 ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <span className="text-xs font-medium">1</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-medium ${currentStep >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                        Détails du colis
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Description et poids
                                    </p>
                                </div>
                                {currentStep === 1 && (
                                    <div className="w-px h-8 bg-green-500 ml-3"></div>
                                )}
                            </div>

                            {/* Step 2: Photos */}
                            <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                    {currentStep > 2 ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <span className="text-xs font-medium">2</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-medium ${currentStep >= 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                        Photos du colis
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Au moins une photo
                                    </p>
                                </div>
                                {currentStep === 2 && (
                                    <div className="w-px h-8 bg-green-500 ml-3"></div>
                                )}
                            </div>

                            {/* Step 3: Review & Confirm */}
                            <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                    <span className="text-xs font-medium">3</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-medium ${currentStep >= 3 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                        Confirmation
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Vérification finale
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Étape {currentStep} sur 3
                            </h3>
                        </div>

                        {/* Step 1: Package Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description du colis
                                    </label>
                                    <textarea
                                        value={packageDescription}
                                        onChange={(e) => setPackageDescription(e.target.value)}
                                        rows={4}
                                        placeholder="Décrivez brièvement le contenu, l'emballage, etc."
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Poids (kg)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="0.0"
                                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Date limite (optionnel)
                                        </label>
                                        <input
                                            type="date"
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Price preview */}
                                {weight && (
                                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Aperçu du prix</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                                <span>Sous-total ({weight}kg × ${pricePerKilo})</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                                <span>TVA 24%</span>
                                                <span>${vat.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                                <span>Frais plateforme</span>
                                                <span>${platformTax.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 flex items-center justify-between text-gray-800 dark:text-gray-200 font-semibold">
                                                <span>Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Photos */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                        Photos du colis (au moins 1 photo requise)
                                    </p>

                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="photo-upload"
                                        />
                                        <label htmlFor="photo-upload" className="cursor-pointer">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="text-lg font-medium">Ajouter des photos</p>
                                                <p className="text-sm">Glissez-déposez ou cliquez pour sélectionner</p>
                                            </div>
                                        </label>
                                    </div>

                                    {photos.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                            {photos.map((photo, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(photo)}
                                                        alt={`Photo ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        onClick={() => removePhoto(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review & Confirm */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">Récapitulatif de la réservation</h4>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Description:</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{packageDescription}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Poids:</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{weight} kg</span>
                                        </div>
                                        {deadline && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Date limite:</span>
                                                <span className="text-gray-900 dark:text-white font-medium">{deadline}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Photos:</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{photos.length} photo(s)</span>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                                            <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white">
                                                <span>Total à payer:</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                                        J'accepte les <a href="#" className="text-blue-600 hover:text-blue-700 underline">conditions générales</a> et la <a href="#" className="text-blue-600 hover:text-blue-700 underline">politique de confidentialité</a>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium transition-colors ${currentStep === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                ← Retour
                            </button>

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!canProceedToNext()}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${canProceedToNext()
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Suivant →
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!canProceedToNext()}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${canProceedToNext()
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Confirmer la réservation
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
