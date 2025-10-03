import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { listings } from '../data/announces';
import { useState } from 'react';
import FooterMinimal from '~/components/FooterMinimal';
import PropertyCard from '~/components/PropertyCard';
import SearchFiltersBar from '~/components/SearchFiltersBar';

export default function Annonces() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(['verified']);
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
        { id: 'verified', label: 'Profil vérifié' },
        { id: 'lowest-price', label: 'Prix le plus bas' },
        { id: 'airline', label: 'Compagnie aérienne' },
        { id: 'travel-date', label: 'Date du voyage' },
        { id: 'travel-ad', label: 'Annonce de voyage' },
        { id: 'transport-request', label: 'Demande de Transport' }
    ];

    const handleFilterChange = (filterId: string) => {
        setSelectedFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(id => id !== filterId)
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
                        onChange={(f) => setSearchParams({ from: f.from, to: f.to, date: f.date, flight: f.flight })}
                    />
                </div>


                {/* Main Content with Filters and Results */}
                <div className="flex  gap-8 mt-10 ">
                    {/* Left Sidebar - Filters */}
                    <div className="w-64 fixed flex-shrink-0  top-64 left-0 ">
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
                                    <label key={filter.id} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.includes(filter.id)}
                                            onChange={() => handleFilterChange(filter.id)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{filter.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Results Grid */}
                    <div className="w-[calc(100%-256px)] ml-64 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {listings.map((listing) => {
                                const tripDate = formatDate(listing.departure.date);
                                const route = `${listing.departure.airport} - ${listing.destination.airport}`;

                                return (
                                    <PropertyCard
                                        key={listing.id}
                                        id={listing.id}
                                        name={listing.traveler.name}
                                        avatar={listing.traveler.avatar}
                                        location={route}
                                        price={`${listing.price}`}
                                        rating={listing.traveler.rating.toString()}
                                        image={listing.traveler.avatar}
                                        featured={listing.traveler.verified}
                                        weight={`${listing.availableWeight}kg`}
                                        departure={tripDate}
                                        airline={listing.departure.airline}
                                        // isRequest={listing.isRequest}
                                        type={listing.type}
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