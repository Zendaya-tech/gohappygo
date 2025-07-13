import Header from '../components/Header';
import Footer from '../components/Footer';

interface Listing {
    id: string;
    traveler: {
        name: string;
        avatar: string;
        rating: number;
        verified: boolean;
    };
    departure: {
        city: string;
        country: string;
        date: string;
        time: string;
    };
    destination: {
        city: string;
        country: string;
    };
    price: number;
    availableWeight: number;
    maxWeight: number;
    description: string;
}

export default function Annonces() {
    const listings: Listing[] = [
        {
            id: "1",
            traveler: {
                name: "Marie Dubois",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
                rating: 4.8,
                verified: true
            },
            departure: {
                city: "Paris",
                country: "France",
                date: "2024-03-20",
                time: "14:30"
            },
            destination: {
                city: "New York",
                country: "États-Unis"
            },
            price: 15,
            availableWeight: 8,
            maxWeight: 10,
            description: "Voyage d'affaires, espace disponible dans ma valise pour vos colis"
        },
        {
            id: "2",
            traveler: {
                name: "Thomas Martin",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                rating: 4.9,
                verified: true
            },
            departure: {
                city: "Lyon",
                country: "France",
                date: "2024-03-22",
                time: "09:15"
            },
            destination: {
                city: "Tokyo",
                country: "Japon"
            },
            price: 18,
            availableWeight: 5,
            maxWeight: 8,
            description: "Vacances au Japon, je peux transporter vos colis avec plaisir"
        },
        {
            id: "3",
            traveler: {
                name: "Sophie Laurent",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                rating: 4.7,
                verified: true
            },
            departure: {
                city: "Marseille",
                country: "France",
                date: "2024-03-18",
                time: "16:45"
            },
            destination: {
                city: "Londres",
                country: "Royaume-Uni"
            },
            price: 8,
            availableWeight: 12,
            maxWeight: 15,
            description: "Étudiant en échange, beaucoup d'espace disponible"
        },
        {
            id: "4",
            traveler: {
                name: "Pierre Moreau",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                rating: 4.6,
                verified: false
            },
            departure: {
                city: "Nice",
                country: "France",
                date: "2024-03-25",
                time: "11:20"
            },
            destination: {
                city: "Barcelone",
                country: "Espagne"
            },
            price: 6,
            availableWeight: 7,
            maxWeight: 10,
            description: "Week-end à Barcelone, espace libre dans mes bagages"
        },
        {
            id: "5",
            traveler: {
                name: "Emma Bernard",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                rating: 4.9,
                verified: true
            },
            departure: {
                city: "Toulouse",
                country: "France",
                date: "2024-03-28",
                time: "07:50"
            },
            destination: {
                city: "Berlin",
                country: "Allemagne"
            },
            price: 12,
            availableWeight: 6,
            maxWeight: 8,
            description: "Conférence professionnelle, transport sécurisé garanti"
        },
        {
            id: "6",
            traveler: {
                name: "Lucas Petit",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                rating: 4.5,
                verified: true
            },
            departure: {
                city: "Bordeaux",
                country: "France",
                date: "2024-03-30",
                time: "13:10"
            },
            destination: {
                city: "Amsterdam",
                country: "Pays-Bas"
            },
            price: 10,
            availableWeight: 9,
            maxWeight: 12,
            description: "Voyage personnel, flexible sur les types de colis"
        }
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Annonces de <span className="text-blue-600">transport</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Découvrez tous les voyageurs disponibles pour transporter vos colis
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Départ</label>
                            <input
                                type="text"
                                placeholder="Ville de départ"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                            <input
                                type="text"
                                placeholder="Ville d'arrivée"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-end">
                            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-6">

                            {/* Traveler Info */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="relative">
                                    <img
                                        src={listing.traveler.avatar}
                                        alt={listing.traveler.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    {listing.traveler.verified && (
                                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{listing.traveler.name}</h3>
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">{listing.traveler.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Route */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-gray-900">{listing.departure.city}</div>
                                        <div className="text-sm text-gray-500">{formatDate(listing.departure.date)} • {listing.departure.time}</div>
                                    </div>
                                    <div className="mx-4">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-900">{listing.destination.city}</div>
                                        <div className="text-sm text-gray-500">{listing.destination.country}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Weight */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{listing.price}€/kg</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">{listing.availableWeight}kg</div>
                                    <div className="text-sm text-gray-500">disponible</div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                Contacter
                            </button>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                    <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                        Voir plus d'annonces
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
} 