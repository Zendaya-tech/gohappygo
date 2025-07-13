import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
    CheckIcon,
    MapPinIcon,
    StarIcon,
    ClockIcon,
    CheckCircleIcon,
    ChatBubbleLeftIcon,
    ShareIcon,
    ChartBarIcon,
    UserIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    QuestionMarkCircleIcon,
    PaperAirplaneIcon,
    CubeIcon,
    ArchiveBoxIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    accountType: 'sender' | 'carrier';
    verified: boolean;
    rating: number;
    totalTrips: number;
    joinDate: string;
    bio: string;
    location: string;
    languages: string[];
    responseTime: string;
    completionRate: number;
}

interface Trip {
    id: string;
    type: 'sent' | 'carried';
    route: string;
    date: string;
    status: 'completed' | 'in-progress' | 'cancelled';
    price: number;
    weight: number;
}

interface Package {
    id: string;
    title: string;
    route: string;
    date: string;
    status: 'pending' | 'accepted' | 'in-transit' | 'delivered' | 'cancelled';
    price: number;
    weight: number;
    carrier?: string;
}

interface Stats {
    totalEarnings: number;
    totalPackagesSent: number;
    totalPackagesCarried: number;
    averageRating: number;
    totalDistance: number;
}

export default function Profile() {
    const [activeTab, setActiveTab] = useState<'voyages' | 'packages'>('voyages');
    const [isEditing, setIsEditing] = useState(false);

    // Mock user data
    const [userProfile, setUserProfile] = useState<UserProfile>({
        firstName: 'Marie',
        lastName: 'Dubois',
        email: 'marie.dubois@email.com',
        phone: '06 12 34 56 78',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200&h=200&fit=crop&crop=face',
        accountType: 'carrier',
        verified: true,
        rating: 4.8,
        totalTrips: 24,
        joinDate: '2023-01-15',
        bio: 'Voyageuse passionnée qui adore aider les autres à envoyer leurs colis. Spécialisée dans les trajets Europe-Asie.',
        location: 'Paris, France',
        languages: ['Français', 'Anglais', 'Espagnol'],
        responseTime: '2h',
        completionRate: 98
    });

    const stats: Stats = {
        totalEarnings: 2840,
        totalPackagesSent: 12,
        totalPackagesCarried: 156,
        averageRating: 4.8,
        totalDistance: 45600
    };

    const trips: Trip[] = [
        {
            id: '1',
            type: 'carried',
            route: 'Paris → Tokyo',
            date: '2024-03-15',
            status: 'completed',
            price: 180,
            weight: 5
        },
        {
            id: '2',
            type: 'carried',
            route: 'Lyon → Londres',
            date: '2024-03-10',
            status: 'completed',
            price: 45,
            weight: 2
        },
        {
            id: '3',
            type: 'carried',
            route: 'Nice → Berlin',
            date: '2024-03-20',
            status: 'in-progress',
            price: 96,
            weight: 4
        }
    ];

    const packages: Package[] = [
        {
            id: '1',
            title: 'Documents importants',
            route: 'Paris → New York',
            date: '2024-03-25',
            status: 'accepted',
            price: 45,
            weight: 1,
            carrier: 'Thomas Martin'
        },
        {
            id: '2',
            title: 'Cadeau d\'anniversaire',
            route: 'Lyon → Londres',
            date: '2024-03-18',
            status: 'delivered',
            price: 30,
            weight: 2,
            carrier: 'Sophie Laurent'
        },
        {
            id: '3',
            title: 'Échantillons produits',
            route: 'Marseille → Berlin',
            date: '2024-03-30',
            status: 'pending',
            price: 25,
            weight: 1.5
        }
    ];

    const handleSave = () => {
        setIsEditing(false);
        console.log('Saving profile:', userProfile);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
            case 'delivered':
                return 'bg-green-500';
            case 'in-progress':
            case 'in-transit':
            case 'accepted':
                return 'bg-blue-500';
            case 'pending':
                return 'bg-yellow-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Terminé';
            case 'in-progress':
                return 'En cours';
            case 'cancelled':
                return 'Annulé';
            case 'pending':
                return 'En attente';
            case 'accepted':
                return 'Accepté';
            case 'in-transit':
                return 'En transit';
            case 'delivered':
                return 'Livré';
            default:
                return status;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={userProfile.avatar}
                                alt={`${userProfile.firstName} ${userProfile.lastName}`}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {userProfile.verified && (
                                <div className="absolute -bottom-2 -right-2 bg-white text-blue-600 rounded-full p-3 shadow-lg">
                                    <CheckIcon className="w-6 h-6" />
                                </div>
                            )}
                            <div className="absolute -top-2 -left-2 bg-yellow-400 text-yellow-900 rounded-full px-2 py-1 text-xs font-bold">
                                TOP
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-3">
                                {userProfile.firstName} {userProfile.lastName}
                            </h1>
                            <div className="flex items-center space-x-2 mb-4">
                                <MapPinIcon className="w-5 h-5 text-yellow-300" />
                                <span className="text-blue-100">{userProfile.location}</span>
                            </div>
                            <div className="flex items-center space-x-6 mb-4">
                                <div className="flex items-center space-x-2">
                                    <StarIcon className="w-6 h-6 text-yellow-300 fill-current" />
                                    <span className="text-2xl font-bold">{userProfile.rating}</span>
                                    <span className="text-blue-100">({userProfile.totalTrips} avis)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="w-6 h-6 text-blue-200" />
                                    <span className="text-blue-100">Répond en {userProfile.responseTime}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircleIcon className="w-6 h-6 text-green-300" />
                                    <span className="text-blue-100">{userProfile.completionRate}% de réussite</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${userProfile.accountType === 'carrier'
                                    ? 'bg-white text-blue-600'
                                    : 'bg-white text-green-600'
                                    }`}>
                                    {userProfile.accountType === 'carrier' ? ' Transporteur Expert' : ' Expéditeur'}
                                </span>
                                {userProfile.verified && (
                                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-400 text-green-900">
                                        ✓ Compte Vérifié
                                    </span>
                                )}
                            </div>
                            <p className="text-blue-100 text-lg leading-relaxed">{userProfile.bio}</p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col space-y-3">
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold shadow-lg flex items-center space-x-2">
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                                <span>Contacter</span>
                            </button>
                            <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold flex items-center space-x-2">
                                <ShareIcon className="w-5 h-5" />
                                <span>Partager</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Stats & Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Statistics Cards */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <ChartBarIcon className="w-5 h-5 mr-2 text-blue-600" />
                                Statistiques
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{stats.totalEarnings}€</div>
                                    <div className="text-sm text-gray-600">Gains totaux</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">{stats.totalPackagesCarried}</div>
                                    <div className="text-sm text-gray-600">Colis transportés</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">{(stats.totalDistance / 1000).toFixed(0)}k km</div>
                                    <div className="text-sm text-gray-600">Distance parcourue</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">{stats.totalPackagesSent}</div>
                                    <div className="text-sm text-gray-600">Colis envoyés</div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Informations
                                </h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    {isEditing ? 'Annuler' : 'Modifier'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={userProfile.email}
                                            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        />
                                    ) : (
                                        <p className="text-gray-900 text-sm">{userProfile.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={userProfile.phone}
                                            onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        />
                                    ) : (
                                        <p className="text-gray-900 text-sm">{userProfile.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Langues parlées</label>
                                    <div className="flex flex-wrap gap-2">
                                        {userProfile.languages.map((lang, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Membre depuis</label>
                                    <p className="text-gray-900 text-sm">{formatDate(userProfile.joinDate)}</p>
                                </div>

                                {isEditing && (
                                    <button
                                        onClick={handleSave}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                                    >
                                        Sauvegarder
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                            <div className="space-y-3">
                                <a href="/annonces" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="text-blue-700 font-medium">Voir les annonces</span>
                                </a>
                                <button className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 w-full">
                                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-green-700 font-medium">Poster une annonce</span>
                                </button>
                                <button className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 w-full">
                                    <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-purple-700 font-medium">Centre d'aide</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tabs Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-8">
                                    {[
                                        {
                                            id: 'voyages',
                                            label: 'Mes Voyages',
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            ),
                                            count: trips.length
                                        },
                                        {
                                            id: 'packages',
                                            label: 'Mes Colis',
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                                                </svg>
                                            ),
                                            count: packages.length
                                        }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {tab.icon}
                                            <span>{tab.label}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${activeTab === tab.id
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {tab.count}
                                            </span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-8">
                                {/* Voyages Tab */}
                                {activeTab === 'voyages' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-gray-900">Mes voyages de transport</h3>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                                                + Nouveau voyage
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {trips.map((trip) => (
                                                <div key={trip.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className={`w-4 h-4 rounded-full ${getStatusColor(trip.status)}`}></div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 text-lg">{trip.route}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    Transporté • {formatDate(trip.date)}
                                                                </p>
                                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                    trip.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {getStatusLabel(trip.status)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-xl text-gray-900">{trip.price}€</p>
                                                            <p className="text-sm text-gray-600">{trip.weight}kg transportés</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Packages Tab */}
                                {activeTab === 'packages' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-gray-900">Mes demandes d'envoi</h3>
                                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                                                + Nouvelle demande
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {packages.map((pkg) => (
                                                <div key={pkg.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className={`w-4 h-4 rounded-full ${getStatusColor(pkg.status)}`}></div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 text-lg">{pkg.title}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {pkg.route} • {formatDate(pkg.date)}
                                                                </p>
                                                                {pkg.carrier && (
                                                                    <p className="text-sm text-blue-600 font-medium">
                                                                        Transporteur: {pkg.carrier}
                                                                    </p>
                                                                )}
                                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${pkg.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                    pkg.status === 'accepted' || pkg.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                                                                        pkg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {getStatusLabel(pkg.status)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-xl text-gray-900">{pkg.price}€</p>
                                                            <p className="text-sm text-gray-600">{pkg.weight}kg</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}