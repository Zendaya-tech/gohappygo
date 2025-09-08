import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Route } from "../+types/root";
import { getListingById, type Listing } from "../data/announces";
import { Link, useParams, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import FooterMinimal from "~/components/FooterMinimal";
import { ShareIcon } from "@heroicons/react/24/outline";
import BookingDialog from "~/components/common/dialog/BookingDialog";
import ShareDialog from "~/components/common/dialog/ShareDialog";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function AnnounceDetail() {
    const params = useParams<"id">();
    const navigate = useNavigate();
    const id = params.id ?? "";
    const listing: Listing | undefined = getListingById(id);
    const [kilos, setKilos] = useState<number>(0);
    const [shareOpen, setShareOpen] = useState<boolean>(false);
    const [bookOpen, setBookOpen] = useState<boolean>(false);
    const [sliderOpen, setSliderOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    if (!listing) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Header />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Annonce introuvable</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Vérifiez l'identifiant ou retournez à la liste des annonces.</p>
                        <Link to="/annonces" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Retour aux annonces</Link>
                    </div>
                </main>
                <FooterMinimal />
            </div>
        );
    }

    const availableRatio = listing.maxWeight > 0 ? listing.availableWeight / listing.maxWeight : 0;
    const availablePercent = Math.round(availableRatio * 100);

    // Simple gallery to mirror the design
    const galleryImages = useMemo(
        () => [
            "https://images.planefinder.net/api/logo-square/BYD/w/396",
            "/images/rencontre1-converted.webp",
            "/images/rencontre2-converted.webp",
            "/images/rencontre3-converted.webp",
        ],
        []
    );

    // Pricing calculation similar to the right-hand summary in the mock
    const pricePerKg = listing.price;
    const subtotal = kilos * pricePerKg;
    const platformCommission = 0; // can be adjusted later
    const vatRate = 0.24;
    const vat = subtotal * vatRate;
    const insurance = 0;
    const platformTax = 10; // flat example
    const total = Math.max(0, subtotal + platformCommission + vat + insurance + platformTax);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* Left: media + traveller + route + description */}
                <div >
                    {/* top right small action */}
                    <div className="flex items-center justify-end text-sm text-gray-500 mb-3 gap-3">
                        <button className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600" onClick={() => setShareOpen(true)}>
                            <ShareIcon className="h-4 w-4" />
                            Partager
                        </button>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`inline-flex items-center gap-2 transition-all duration-200 hover:scale-105 ${isFavorite
                                ? 'text-red-500'
                                : 'text-gray-500 hover:text-rose-600'
                                }`}
                        >
                            <svg
                                className="h-4 w-4 transition-colors duration-200"
                                fill={isFavorite ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                            </svg>
                            {isFavorite ? 'Retirer des favoris' : 'Add to favourite'}
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
                                        src={galleryImages[0]}
                                        alt="main"
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0  bg-black  opacity-0  group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                                </div>
                            </div>
                            <div className="w-80  flex flex-col gap-3">
                                <div
                                    className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    onClick={() => {
                                        setCurrentImageIndex(1);
                                        setSliderOpen(true);
                                    }}
                                >
                                    <img
                                        src={galleryImages[1]}
                                        alt="thumb-1"
                                        className="h-full w-full object-cover transition-transform duration-300 "
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                                </div>
                                <div
                                    className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    onClick={() => {
                                        setCurrentImageIndex(2);
                                        setSliderOpen(true);
                                    }}
                                >
                                    <img
                                        src={galleryImages[2]}
                                        alt="thumb-2"
                                        className="h-full w-full object-cover transition-transform duration-300 "
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
                        <div className=" lg:col-span-2 ">
                            {/* Traveller bar */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={listing.traveler.avatar} alt={listing.traveler.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow" />
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{listing.traveler.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Note {listing.traveler.rating} • {listing.traveler.verified ? "Vérifié" : "Non vérifié"}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        Profile
                                    </button>
                                    <button className="rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">Message</button>
                                </div>
                            </div>

                            {/* Route line */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 text-sm">
                                <div className="md:col-span-9">
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-700 dark:text-gray-300">
                                        <span className="font-medium">{listing.departure.city} → {listing.destination.city}</span>
                                        <span>Départ: {formatDate(listing.departure.date)}</span>
                                        <span className="font-medium">Vol N° FRH{String(listing.id).padStart(3, "0")}</span>
                                        <span className="text-indigo-600">Espace disponible: {listing.availableWeight}kg</span>
                                    </div>
                                </div>
                                <div className="md:col-span-3 text-left md:text-right">
                                    <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">${listing.price}<span className="text-base font-semibold">/Kilo</span></div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {listing.description}. Cela correspond à mes convictions écologiques, et aussi je pense que les compagnies nous plument avec le frais de bagages, autant que ce soit un particulier qui en profite.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                    Je retourne sur {listing.destination.city} prochainement. Vous pouvez retrouver mes voyages sur la plateforme.
                                </p>
                            </div>

                            {/* Badges */}
                            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                                <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">✓</span>
                                    accepte qu'une personne pour tous les kilos
                                </div>
                                <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">⏱️</span>
                                    accepte la ponctualité
                                </div>
                                <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">⚖️</span>
                                    n'accepte pas de grammes en trop
                                </div>
                            </div>

                            {/* Capacity bar */}
                            <div className="mt-6 space-y-2">
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                    <div className={`h-full rounded-full ${availableRatio > 0.5 ? "bg-green-500" : availableRatio > 0.2 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${availablePercent}%` }} />
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Capacité restante: {listing.availableWeight}kg / {listing.maxWeight}kg ({availablePercent}%)</div>
                            </div>
                        </div>

                        {/* Right: booking summary */}
                        <aside className="lg:col-span-1">
                            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">${listing.price}<span className="text-base font-semibold">/Kilo</span></div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-6">Prix par kilogramme</div>

                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter n° Kilo</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={kilos}
                                    onChange={(e) => setKilos(Number(e.target.value))}
                                    placeholder="0"
                                    className="mb-6 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between text-gray-500"><span>commission plateforme</span><span>{platformCommission.toFixed(0)}</span></div>
                                    <div className="flex items-center justify-between text-gray-500"><span>TVA 24 %</span><span>{vat.toFixed(0)}</span></div>
                                    <div className="flex items-center justify-between text-gray-500"><span>Assurance</span><span>{insurance.toFixed(0)}</span></div>
                                    <div className="flex items-center justify-between text-gray-500"><span>Platform Tax</span><span>{platformTax.toFixed(0)}</span></div>
                                </div>

                                <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700 dark:text-gray-300">Total with taxes</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">${total.toFixed(0)}</span>
                                    </div>
                                </div>

                                <button onClick={() => setBookOpen(true)} className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Book now</button>
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
                    title: `Transport ${listing.departure.city} → ${listing.destination.city}`,
                    location: `${listing.departure.city}, ${listing.destination.city}`,
                    rating: listing.traveler.rating,
                    bedrooms: 1,
                    beds: 1,
                    bathrooms: 1,
                    image: listing.traveler.avatar
                }}
            />
            {/* Booking Dialog */}
            <BookingDialog
                open={bookOpen}
                onClose={() => setBookOpen(false)}
                pricePerKilo={listing.price}
                onConfirm={(packageData) => {
                    setKilos(packageData.weight);
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
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Previous button */}
                        <button
                            onClick={() => setCurrentImageIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next button */}
                        <button
                            onClick={() => setCurrentImageIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Main image */}
                        <div className="max-w-4xl max-h-full">
                            <img
                                src={galleryImages[currentImageIndex]}
                                alt={`Image ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain rounded-lg"
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
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                                        ? 'bg-white'
                                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
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

export const meta: Route.MetaFunction = ({ params }) => {
    return [
        { title: `Annonce #${params.id} - GoHappyGo` },
        { name: "description", content: "Détails de l'annonce de transport." }
    ];
};


