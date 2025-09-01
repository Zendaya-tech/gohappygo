import { useState } from 'react';
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

interface ProfileSection {
    id: string;
    label: string;
    icon: React.ReactNode;
    count: number;
}

export default function Profile() {
    const [activeSection, setActiveSection] = useState<string>('reviews');
    const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);

    const profileSections: ProfileSection[] = [
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
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <PaperAirplaneIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucun voyage</p>
                            </div>
                        </div>
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