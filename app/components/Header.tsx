import { useState } from 'react';
import NotificationPopover from './common/popover/NotificationPopover';
import AppDownloadPopover from './common/popover/AppDownloadPopover';
import { useRef } from 'react';
import AvatarMenu from './common/popover/AvatarMenu';
import SettingsDialog from './common/dialog/SettingsDialog';
import CreatePackageDialog from './common/dialog/CreatePackageDialog';
import CreateAnnounceDialog from './common/dialog/CreateAnnounceDialog';
import { Link } from 'react-router';
import { useAuthStore, type AuthState } from '../store/auth';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = useAuthStore((s: AuthState) => s.isLoggedIn);
    const [showNotif, setShowNotif] = useState(false);
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showCreateAnnounce, setShowCreateAnnounce] = useState(false);
    const [hoverDownload, setHoverDownload] = useState(false);
    const [pinnedDownload, setPinnedDownload] = useState(false);
    const downloadBtnRef = useRef<HTMLElement>({} as HTMLElement);
    const [showCreatePackage, setShowCreatePackage] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/80  border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className=" h-10">
                            <img src="/logo.png" alt="Logo" className=" h-10 " />
                        </div>
                        <div className="flex flex-col">
                            <a href="/" className="font-bold text-xl text-gray-900">Go Happy Go</a>
                            <span className="text-xs text-gray-500 -mt-1">Voyagez ensemble, partagez l'espace</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/annonces" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Voir les annonces
                        </Link>
                        <button onClick={() => setShowCreatePackage(true)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Envoyer un colis</button>
                        <div className="relative">
                            <button
                                onClick={() => setHoverDownload((v) => !v)}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                                ref={(el) => { (downloadBtnRef as any).current = el; }}
                            >
                                Téléchargez l’appli +
                            </button>
                            <AppDownloadPopover open={hoverDownload} onClose={() => { setHoverDownload(false); setPinnedDownload(false); }} pinned={pinnedDownload} onTogglePin={() => setPinnedDownload((v) => !v)} triggerRef={downloadBtnRef} />
                        </div>
                        <button onClick={() => setShowCreateAnnounce(true)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Publier un annonces +
                        </button>

                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4 relative">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                className="text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Notifications"
                                onMouseDown={(e) => e.preventDefault()}
                                onClickCapture={(e) => {
                                    e.stopPropagation();
                                    setShowNotif((v) => !v);
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                            </button>
                            <NotificationPopover open={showNotif} onClose={() => setShowNotif(false)} />
                        </div>
                        {isLoggedIn ? (
                            <>
                                <div className="w-px h-6 bg-gray-300"></div>
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50"
                                        onClick={() => setShowAvatarMenu((v) => !v)}
                                        aria-label="Ouvrir le menu du compte"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32&h=32&fit=crop&crop=face"
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                                        </svg>
                                    </button>
                                    <AvatarMenu
                                        open={showAvatarMenu}
                                        onClose={() => setShowAvatarMenu(false)}
                                        onOpenSettings={() => setShowSettings(true)}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                                    Se connecter
                                </a>
                                <div className="w-px h-6 bg-gray-300"></div>
                                <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                                    S'inscrire
                                </a>
                            </>
                        )}
                        <button className="text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        {isLoggedIn ? (
                            <a href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32&h=32&fit=crop&crop=face"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </a>
                        ) : (
                            <a href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                                S'inscrire
                            </a>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />
                    <CreatePackageDialog open={showCreatePackage} onClose={() => setShowCreatePackage(false)} />
                    <CreateAnnounceDialog open={showCreateAnnounce} onClose={() => setShowCreateAnnounce(false)} />
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <a href="/annonces" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Voir les annonces
                            </a>
                            {/* <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Envoyer un colis
                            </a>
                            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Transporter
                            </a> */}
                            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Comment ça marche
                            </a>

                        </div>
                    </div>
                )}
            </div>
        </header>
    );
} 