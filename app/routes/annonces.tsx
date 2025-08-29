import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { listings } from '../data/announces';
import { useState } from 'react';
import FooterMinimal from '~/components/FooterMinimal';
import PropertyCard from '~/components/PropertyCard';

export default function Annonces() {
    const [selectedFilter, setSelectedFilter] = useState('verified');
    const [searchParams, setSearchParams] = useState({
        from: 'Paris',
        to: 'New-York',
        date: '12/10/2025',
        flight: ''
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
    };

    const filters = [
        { id: 'verified', label: 'Profil vérifié', selected: selectedFilter === 'verified' },
        { id: 'lowest-price', label: 'Prix le plus bas', selected: selectedFilter === 'lowest-price' },
        { id: 'airline', label: 'Compagnie aérienne', selected: selectedFilter === 'airline' },
        { id: 'travel-date', label: 'Date du voyage', selected: selectedFilter === 'travel-date' },
        { id: 'travel-ad', label: 'Annonce de voyage', selected: selectedFilter === 'travel-ad' },
        { id: 'transport-request', label: 'Demande de Transport', selected: selectedFilter === 'transport-request' }
    ];

    return (
        <div className="min-h-screen dark:bg-gray-950 relative">
            <Header />

            <main className="container mx-auto py-8 px-4">
                {/* Search Bar - Hero Section Style */}
                <div className="bg-white z-50  w-full mx-auto dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">De</label>
                            <input
                                type="text"
                                value={searchParams.from}
                                onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                                placeholder="Ville de départ"
                                className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                            />
                        </div>
                        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vers</label>
                            <input
                                type="text"
                                value={searchParams.to}
                                onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                                placeholder="Ville d'arrivée"
                                className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                            />
                        </div>
                        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                            <input
                                type="text"
                                value={searchParams.date}
                                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                                placeholder="Quand ?"
                                className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                            />
                        </div>
                        <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vol</label>
                            <input
                                type="text"
                                value={searchParams.flight}
                                onChange={(e) => setSearchParams({ ...searchParams, flight: e.target.value })}
                                placeholder="Numéro de vol"
                                className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="min-w-0">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">Rechercher</label>
                                <span className="text-sm text-gray-600 dark:text-gray-300 truncate block">Trouver un voyageur</span>
                            </div>
                            <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content with Filters and Results */}
                <div className="flex gap-8  ">
                    {/* Left Sidebar - Filters */}
                    <div className="w-64 flex-shrink-0 sticky top-52">
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6  border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-6">
                                <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
                                    Filtrer par
                                </button>
                                <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    tout effacer
                                </button>
                            </div>

                            <div className="space-y-3">
                                {filters.map((filter) => (
                                    <label key={filter.id} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="filter"
                                            value={filter.id}
                                            checked={filter.selected}
                                            onChange={() => setSelectedFilter(filter.id)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{filter.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Results Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {listings.map((listing) => {
                                const tripDate = formatDate(listing.departure.date);
                                const route = `${listing.departure.airport} - ${listing.destination.airport}`;

                                return (
                                    <PropertyCard
                                        key={listing.id}
                                        title={listing.traveler.name}
                                        location={route}
                                        price={`${listing.price}€/kg`}
                                        rating={listing.traveler.rating.toString()}
                                        image={listing.traveler.avatar}
                                        featured={listing.traveler.verified}
                                        weight={`${listing.availableWeight}kg`}
                                        departure={tripDate}
                                        airline={listing.airline}
                                        isRequest={listing.isRequest}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <FooterMinimal />
        </div>
    );
} 