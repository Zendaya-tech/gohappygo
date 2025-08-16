import { useState } from 'react';
import Header from '../components/Header';
import FooterMinimal from '~/components/FooterMinimal';
import {
    CheckIcon,
    MapPinIcon,
    StarIcon,
    ClockIcon,
    CheckCircleIcon,
    ChatBubbleLeftIcon,
    ShareIcon,
    ChartBarIcon
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
    const [activeTab, setActiveTab] = useState<'voyages' | 'packages' | 'transport'>('voyages');
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                    {/* Sidebar with avatar and info */}
                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center">
                            <div className="relative inline-block">
                                <img src={userProfile.avatar} alt={`${userProfile.firstName} ${userProfile.lastName}`} className="h-28 w-28 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow" />
                                {userProfile.verified && (
                                    <span className="absolute -right-2 -bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow">
                                        <CheckIcon className="h-5 w-5" />
                                    </span>
                                )}
                            </div>
                            <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{userProfile.firstName} {userProfile.lastName}</h1>
                            <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{userProfile.location}</span>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                <div className="rounded-lg bg-blue-50 dark:bg-blue-400/10 p-3">
                                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">{userProfile.rating}</div>
                                    <div className="text-[11px] text-blue-700/70 dark:text-blue-300/70">Note</div>
                                </div>
                                <div className="rounded-lg bg-green-50 dark:bg-green-400/10 p-3">
                                    <div className="text-sm font-semibold text-green-700 dark:text-green-300">{userProfile.completionRate}%</div>
                                    <div className="text-[11px] text-green-700/70 dark:text-green-300/70">Réussite</div>
                                </div>
                                <div className="rounded-lg bg-purple-50 dark:bg-purple-400/10 p-3">
                                    <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">{userProfile.responseTime}</div>
                                    <div className="text-[11px] text-purple-700/70 dark:text-purple-300/70">Réponse</div>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Membre depuis {formatDate(userProfile.joinDate)}</div>
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {userProfile.languages.map((lang, i) => (
                                    <span key={i} className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs text-gray-700 dark:text-gray-200">{lang}</span>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-col gap-2">
                                <button className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"><ChatBubbleLeftIcon className="mr-2 h-4 w-4" />Contacter</button>
                                <button className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"><ShareIcon className="mr-2 h-4 w-4" />Partager</button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                            <h3 className="mb-4 flex items-center text-sm font-semibold text-gray-900 dark:text-white"><ChartBarIcon className="mr-2 h-4 w-4 text-blue-600" />Statistiques</h3>
                            <div className="grid grid-cols-2 gap-3 text-center text-sm">
                                <div className="rounded-lg bg-blue-50 dark:bg-blue-400/10 p-3"><div className="font-bold text-blue-700 dark:text-blue-300">{stats.totalEarnings}€</div><div className="text-[11px] text-blue-700/70 dark:text-blue-300/70">Gains</div></div>
                                <div className="rounded-lg bg-green-50 dark:bg-green-400/10 p-3"><div className="font-bold text-green-700 dark:text-green-300">{stats.totalPackagesCarried}</div><div className="text-[11px] text-green-700/70 dark:text-green-300/70">Colis transportés</div></div>
                                <div className="rounded-lg bg-purple-50 dark:bg-purple-400/10 p-3"><div className="font-bold text-purple-700 dark:text-purple-300">{(stats.totalDistance / 1000).toFixed(0)}k km</div><div className="text-[11px] text-purple-700/70 dark:text-purple-300/70">Distance</div></div>
                                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-400/10 p-3"><div className="font-bold text-yellow-700 dark:text-yellow-300">{stats.totalPackagesSent}</div><div className="text-[11px] text-yellow-700/70 dark:text-yellow-300/70">Colis envoyés</div></div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content: tabs for annonces/colis */}
                    <section>
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <div className="px-4 py-3">
                                <nav className="flex flex-wrap gap-2">
                                    {[
                                        { id: 'voyages', label: 'Mes Voyages', count: trips.length },
                                        { id: 'packages', label: 'Mes Colis', count: packages.length },
                                        { id: 'transport', label: 'Transport', count: trips.filter(t => t.type === 'carried').length }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
                                        >
                                            {tab.label}
                                            <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}>{tab.count}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === 'voyages' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {trips.map((trip) => (
                                            <div key={trip.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                                                <div className="font-semibold text-gray-900 dark:text-white">{trip.route}</div>
                                                <div className="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                    <span>{formatDate(trip.date)} · {trip.weight}kg</span>
                                                    <span className={`rounded-full px-2 py-0.5 ${trip.status === 'completed' ? 'bg-green-100 text-green-800' : trip.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>{getStatusLabel(trip.status)}</span>
                                                </div>
                                                <div className="mt-2 text-right text-sm font-semibold text-gray-900 dark:text-white">{trip.price}€</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'packages' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {packages.map((pkg) => (
                                            <div key={pkg.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                                                <div className="font-semibold text-gray-900 dark:text-white">{pkg.title}</div>
                                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{pkg.route} · {formatDate(pkg.date)}</div>
                                                {pkg.carrier && (<div className="text-xs text-indigo-600">Transporteur: {pkg.carrier}</div>)}
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className={`rounded-full px-2 py-0.5 text-xs ${pkg.status === 'delivered' ? 'bg-green-100 text-green-800' : pkg.status === 'accepted' || pkg.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : pkg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{getStatusLabel(pkg.status)}</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{pkg.price}€</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'transport' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {trips.filter(t => t.type === 'carried').map((trip) => (
                                            <div key={trip.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                                                <div className="font-semibold text-gray-900 dark:text-white">{trip.route}</div>
                                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatDate(trip.date)} · {trip.weight}kg</div>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className={`rounded-full px-2 py-0.5 text-xs ${trip.status === 'completed' ? 'bg-green-100 text-green-800' : trip.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>{getStatusLabel(trip.status)}</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{trip.price}€</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <FooterMinimal />
        </div>
    );
}