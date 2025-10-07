import { useMemo, useState } from 'react';
import Header from '../components/Header';
import FooterMinimal from '~/components/FooterMinimal';
import ProfileDialog from '../components/common/dialogs/ProfileDialog';
import {
    StarIcon,
    QuestionMarkCircleIcon,
    PaperAirplaneIcon,
    HeartIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import ReservationCard, { type Reservation } from "~/components/common/ReservationCard";
import ProfileTravelCard, { type ProfileTravel } from "~/components/common/ProfileTravelCard";

interface ProfileSection {
    id: string;
    label: string;
    icon: React.ReactNode;
    count: number;
}


const sampleReservations: Reservation[] = [
    { id: 'r1', originCity: 'Paris', destinationCity: 'New-York', travelDate: '2024-06-24', flightNumber: 'XC456Y', weightKg: 18, priceEuro: 198, status: 'waiting_payment', imageUrl: '/images/paris.jpg' },
    { id: 'r2', originCity: 'Paris', destinationCity: 'New-York', travelDate: '2024-06-24', flightNumber: 'XC456Y', weightKg: 5, priceEuro: 30, status: 'waiting_payment', imageUrl: '/images/paris.jpg' },
    { id: 'r3', originCity: 'Paris', destinationCity: 'New-York', travelDate: '2024-06-24', flightNumber: 'XC456Y', weightKg: 15, priceEuro: 170, status: 'waiting_proposal', customer: { name: 'Angele . O', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' } },
    { id: 'r4', originCity: 'Paris', destinationCity: 'New-York', travelDate: '2024-06-24', flightNumber: 'XC456Y', weightKg: 10, priceEuro: 90, status: 'waiting_proposal', customer: { name: 'Arthur . O', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' } },
]

const ReservationsSection = () => {
    const [tab, setTab] = useState<'waiting_proposal' | 'waiting_payment' | 'archived'>('waiting_proposal');
    const filtered = sampleReservations.filter(r => (tab === 'archived' ? r.status === 'archived' : r.status === tab));
    return (
        <div>
            <div className="flex items-center gap-6 mb-6">
                <button onClick={() => setTab('waiting_proposal')} className={`text-sm font-semibold ${tab === 'waiting_proposal' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>| Waiting for proposal</button>
                <button onClick={() => setTab('waiting_payment')} className={`text-sm font-semibold ${tab === 'waiting_payment' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>| Waiting for payment</button>
                <button onClick={() => setTab('archived')} className={`text-sm font-semibold ${tab === 'archived' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>| Archived reservations</button>
            </div>
            <div className="space-y-4">
                {filtered.map((r) => (
                    <ReservationCard key={r.id} reservation={r} />
                ))}
            </div>
        </div>
    );
};

export default function Profile() {
    const [activeSection, setActiveSection] = useState<string>('reservations');
    const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);

    const profileSections: ProfileSection[] = [
        {
            id: 'reservations',
            label: 'Mes Réservations',
            icon: <PaperAirplaneIcon className="h-5 w-5" />, // reuse icon
            count: 0
        },
        {
            id: 'reviews',
            label: 'Mes Avis',
            icon: <StarIcon className="h-5 w-5" />,
            count: 0
        },
        {
            id: 'travel-requests',
            label: 'Mes Demandes de Voyages',
            icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
            count: 0
        },
        {
            id: 'travels',
            label: 'Mes Voyages',
            icon: <PaperAirplaneIcon className="h-5 w-5" />,
            count: 0
        },
        {
            id: 'favorites',
            label: 'Mes Favoris',
            icon: <HeartIcon className="h-5 w-5" />,
            count: 0
        },
        {
            id: 'payments',
            label: 'Payments',
            icon: <CurrencyDollarIcon className="h-5 w-5" />,
            count: 0
        }
    ];




    const renderContent = () => {
        switch (activeSection) {
            case 'reservations':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="mb-4 text-lg font-semibold">Reservations</div>
                        <ReservationsSection />
                    </div>
                );
            case 'reviews':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">You haven't any reviews</p>
                            </div>
                        </div>
                    </div>
                );
            case 'travel-requests':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucune demande de voyage</p>
                            </div>
                        </div>
                    </div>
                );
            case 'travels':
                const travels: ProfileTravel[] = [
                    { id: 't1', originCity: 'Paris', destinationCity: 'New-York', travelDate: '2024-06-24', flightNumber: 'XC456Y', availableWeightKg: 12, pricePerKg: 15, verified: true, imageUrl: '/images/paris.jpg' },
                    { id: 't2', originCity: 'Lyon', destinationCity: 'Tokyo', travelDate: '2024-07-02', flightNumber: 'AF1234', availableWeightKg: 6, pricePerKg: 18, imageUrl: '/images/rencontre2-converted.webp' },
                ];
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                        {travels.map(t => (
                            <ProfileTravelCard key={t.id} travel={t} />
                        ))}
                    </div>
                );
            case 'favorites':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucun favori</p>
                            </div>
                        </div>
                    </div>
                );
            case 'payments':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <CurrencyDollarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucun paiement</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className=" bg-gray-50">
            <Header />

            <main className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                            {/* Profile Picture Placeholder */}
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Profile Information Prompt */}
                            <p className="text-gray-500 text-sm mb-4">
                                Please add information about yourself in your profile settings.
                            </p>

                            {/* Edit Profile Button */}
                            <button
                                onClick={() => setProfileDialogOpen(true)}
                                className="w-full bg-white border border-blue-500 text-blue-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-50 transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-4">
                            <nav className="space-y-2">
                                {profileSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${activeSection === section.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {section.icon}
                                            <span className="text-sm font-medium">{section.label}</span>
                                        </div>
                                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                            {section.count}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section>
                        {/* Section Title */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                | {profileSections.find(s => s.id === activeSection)?.label}
                            </h1>
                        </div>

                        {/* Content */}
                        {renderContent()}
                    </section>
                </div>
            </main>

            {/* Profile Dialog */}
            <ProfileDialog
                open={profileDialogOpen}
                onClose={() => setProfileDialogOpen(false)}
            />

            <FooterMinimal />
        </div>
    );
}