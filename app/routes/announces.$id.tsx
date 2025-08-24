import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Route } from "../+types/root";
import { getListingById, type Listing } from "../data/announces";
import { Link, useParams } from "react-router";
import { useMemo, useState } from "react";
import FooterMinimal from "~/components/FooterMinimal";
import { ShareIcon } from "@heroicons/react/24/outline";

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
    const id = params.id ?? "";
    const listing: Listing | undefined = getListingById(id);
    const [kilos, setKilos] = useState<number>(0);
    const [shareOpen, setShareOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [bookOpen, setBookOpen] = useState<boolean>(false);
    const [shipDescription, setShipDescription] = useState<string>("");
    const [shipWeight, setShipWeight] = useState<number>(0);
    const [shipDeadline, setShipDeadline] = useState<string>("");

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
            "/images/history-converted.webp",
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
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: media + traveller + route + description */}
                    <div className="lg:col-span-2">
                        {/* top right small action */}
                        <div className="flex items-center justify-end text-sm text-gray-500 mb-3 gap-3">
                            <button className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600" onClick={() => setShareOpen(true)}>
                                <ShareIcon className="h-4 w-4" />
                                Partager
                            </button>
                            <button className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-600">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                                Add to favourite
                            </button>
                        </div>

                        {/* Gallery */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
                            <div className="grid grid-cols-3 gap-0">
                                <div className="col-span-2 p-3">
                                    <div className="aspect-[3/1.2] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                                        <img src={galleryImages[0]} alt="main" className="h-full w-full object-cover" />
                                    </div>
                                </div>
                                <div className="col-span-1 p-3 flex flex-col gap-3">
                                    <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                                        <img src={galleryImages[1]} alt="thumb-1" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                                        <img src={galleryImages[2]} alt="thumb-2" className="h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                <button className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Profile</button>
                                <button className="rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Message</button>
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
            </main>
            {/* Share Dialog */}
            {shareOpen && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShareOpen(false)} />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Partager l'annonce</h3>
                                <button onClick={() => setShareOpen(false)} className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" /></svg>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choisissez un réseau pour partager le lien de cette annonce.</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {(() => {
                                    const url = typeof window !== 'undefined' ? window.location.href : '';
                                    const text = encodeURIComponent("Découvrez cette annonce GoHappyGo");
                                    const encodedUrl = encodeURIComponent(url);
                                    const networks = [
                                        {
                                            name: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`, icon: (
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.87-2.35 8.54 8.54 0 0 1-2.71 1.04 4.26 4.26 0 0 0-7.26 3.88A12.1 12.1 0 0 1 3.16 4.9a4.25 4.25 0 0 0 1.32 5.68 4.21 4.21 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.18c-.47.13-.96.2-1.46.08a4.27 4.27 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 19.54a12.06 12.06 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.56 8.56 0 0 0 22.46 6z" /></svg>
                                            )
                                        },
                                        {
                                            name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: (
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.57V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
                                            )
                                        },
                                        {
                                            name: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`, icon: (
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.03C.122 5.281 5.403 0 12.06 0c3.183 0 6.167 1.24 8.413 3.488a11.82 11.82 0 013.48 8.408c-.003 6.657-5.284 11.938-11.94 11.938-2.011 0-3.985-.508-5.744-1.472L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.593 5.448.003 9.886-4.431 9.889-9.88.002-5.462-4.415-9.885-9.881-9.888-5.45-.003-9.887 4.43-9.889 9.881a9.82 9.82 0 001.63 5.357l-.999 3.648 3.858-.711zM17.47 14.33c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.007-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                            )
                                        },
                                        {
                                            name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`, icon: (
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.944v5.662H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.6 0 4.266 2.37 4.266 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.614 20.452H3.056V9h3.558v11.452z" /></svg>
                                            )
                                        },
                                    ];
                                    return networks.map((n) => (
                                        <a key={n.name} target="_blank" rel="noreferrer noopener" href={n.href} className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                                            {n.icon}
                                            {n.name}
                                        </a>
                                    ));
                                })()}
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <button
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    onClick={async () => {
                                        try {
                                            const url = typeof window !== 'undefined' ? window.location.href : '';
                                            await navigator.clipboard.writeText(url);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        } catch { }
                                    }}
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-9 8h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v8" /></svg>
                                    Copier le lien
                                </button>
                                {copied && <span className="text-xs text-green-600">Lien copié ✓</span>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Booking Dialog */}
            {bookOpen && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setBookOpen(false)} />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informations du colis</h3>
                                <button onClick={() => setBookOpen(false)} className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" /></svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description du colis</label>
                                    <textarea
                                        rows={3}
                                        value={shipDescription}
                                        onChange={(e) => setShipDescription(e.target.value)}
                                        placeholder="Décrivez brièvement le contenu, l’emballage, etc."
                                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Poids (kg)</label>
                                        <input
                                            type="number"
                                            min={0}
                                            step={0.1}
                                            value={shipWeight}
                                            onChange={(e) => setShipWeight(Number(e.target.value))}
                                            placeholder="0.0"
                                            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date limite (optionnel)</label>
                                        <input
                                            type="date"
                                            value={shipDeadline}
                                            onChange={(e) => setShipDeadline(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Price summary inside dialog */}
                                {(() => {
                                    const dlgSubtotal = (shipWeight || 0) * pricePerKg;
                                    const dlgVat = dlgSubtotal * vatRate;
                                    const dlgTotal = Math.max(0, dlgSubtotal + platformCommission + dlgVat + insurance + platformTax);
                                    return (
                                        <div className="mt-2 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-sm">
                                            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-2">
                                                <span>Sous-total</span>
                                                <span>{dlgSubtotal.toFixed(2)}€</span>
                                            </div>
                                            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-2">
                                                <span>TVA 24%</span>
                                                <span>{dlgVat.toFixed(2)}€</span>
                                            </div>
                                            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-2">
                                                <span>Frais plateforme</span>
                                                <span>{(platformCommission + platformTax + insurance).toFixed(2)}€</span>
                                            </div>
                                            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 flex items-center justify-between text-gray-800 dark:text-gray-200 font-semibold">
                                                <span>Total</span>
                                                <span>{dlgTotal.toFixed(2)}€</span>
                                            </div>
                                        </div>
                                    );
                                })()}

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button onClick={() => setBookOpen(false)} className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Annuler</button>
                                    <button
                                        onClick={() => {
                                            setKilos(shipWeight || 0);
                                            setBookOpen(false);
                                        }}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Confirmer la réservation
                                    </button>
                                </div>
                            </div>
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


