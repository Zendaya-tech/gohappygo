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

            <main className="container mx-auto py-8">
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
                                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
                            >
                                {/* Header avec logo aéroport */}
                                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-indigo-600">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    {/* Logo aéroport en arrière-plan */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                                        {tripDate}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div>
                                            <div className="text-lg font-bold text-white">{listing.departure.airport}</div>
                                            <div className="text-sm text-white/80">Aéroport de départ</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenu de la carte */}
                                <div className="p-6">
                                    {/* Route simplifiée */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{listing.departure.airport}</div>
                                            <div className="flex items-center text-gray-400">
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{listing.destination.airport}</div>
                                        </div>
                                    </div>

                                    {/* Informations essentielles */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-indigo-600">{listing.price}€<span className="text-sm font-medium">/kg</span></div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{listing.availableWeight}kg disponible</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">sur {listing.maxWeight}kg max</div>
                                        </div>
                                    </div>

                                    {/* Barre de progression simplifiée */}
                                    <div className="mb-6">
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                            <div
                                                className={`h-full rounded-full ${availableRatio > 0.5 ? "bg-green-500" : availableRatio > 0.2 ? "bg-yellow-500" : "bg-red-500"}`}
                                                style={{ width: `${availablePercent}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/announces/${listing.id}`}
                                            className="flex-1 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                        >
                                            Voir détails
                                        </Link>
                                        <button className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Contacter
                                        </button>
                                    </div>
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