import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { listings } from '../data/announces';
import { useState } from 'react';
import FooterMinimal from '~/components/FooterMinimal';

export default function Annonces() {
    const [showFilters, setShowFilters] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            Annonces de <span className="text-blue-600">transport</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Découvrez tous les voyageurs disponibles pour transporter vos colis
                        </p>
                    </div>
                    <button
                        onClick={() => setShowFilters(true)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M6 12h12M10 19h4" /></svg>
                        Ouvrir le filtre
                    </button>
                </div>

                {/* Slide-over Filters Sidebar */}
                {showFilters && (
                    <div className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
                        <aside className="absolute left-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 flex flex-col">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Affinez votre recherche</p>
                                </div>
                                <button onClick={() => setShowFilters(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aéroport de départ</label>
                                    <input type="text" placeholder="Aéroport de départ" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aéroport d'arrivée</label>
                                    <input type="text" placeholder="Aéroport d'arrivée" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                                    <input type="date" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Numéro de vol</label>
                                    <input type="text" placeholder="Ex: FRH254" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                                </div>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-800 p-5 flex gap-3">
                                <button className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setShowFilters(false)}>Annuler</button>
                                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" onClick={() => setShowFilters(false)}>Appliquer</button>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {listings.map((listing) => {
                        const availableRatio = listing.maxWeight > 0 ? listing.availableWeight / listing.maxWeight : 0;
                        const availablePercent = Math.round(availableRatio * 100);
                        const tripDate = formatDate(listing.departure.date);

                        return (
                            <div
                                key={listing.id}
                                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
                            >
                                {/* Date pill */}
                                <div className="absolute right-4 top-4 rounded-full bg-indigo-50 dark:bg-indigo-400/20 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                                    {tripDate}
                                </div>

                                {/* Traveler Info */}
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="relative">
                                        <img
                                            src={listing.traveler.avatar}
                                            alt={listing.traveler.name}
                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow"
                                        />
                                        {listing.traveler.verified && (
                                            <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
                                                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{listing.traveler.name}</h3>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-400/20 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                                                <svg className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {listing.traveler.rating}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Transporteur</p>
                                    </div>
                                </div>

                                {/* Route */}
                                <div className="mb-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{listing.departure.airport}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{tripDate} • {listing.departure.time}</div>
                                        </div>
                                        <div className="flex flex-col items-center text-gray-400">
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 text-right">
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{listing.destination.airport}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{listing.destination.country}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mb-5 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{listing.description}</p>

                                {/* Price & Capacity */}
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <div className="text-2xl font-bold tracking-tight text-indigo-600">{listing.price}€<span className="text-base font-semibold text-indigo-600">/kg</span></div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Prix par kilogramme</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="rounded-full bg-green-50 dark:bg-green-400/20 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-300">Restant {listing.availableWeight}kg</span>
                                            <span className="rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200">Max {listing.maxWeight}kg</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                        <div
                                            className={`h-full rounded-full ${availableRatio > 0.5 ? "bg-green-500" : availableRatio > 0.2 ? "bg-yellow-500" : "bg-red-500"}`}
                                            style={{ width: `${availablePercent}%` }}
                                        />
                                    </div>
                                    <div className="mt-1.5 text-right text-xs text-gray-500 dark:text-gray-400">{availablePercent}% de capacité restante</div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <Link
                                        to={`/announces/${listing.id}`}
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                    >
                                        Voir les détails
                                    </Link>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Contacter
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                    <button className="bg-white dark:bg-gray-900 text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200">
                        Voir plus d'annonces
                    </button>
                </div>
            </main>


            <FooterMinimal />


        </div>
    );
} 