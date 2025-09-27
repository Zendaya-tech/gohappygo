import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NotificationPopover from './common/popover/NotificationPopover';
import AppDownloadPopover from './common/popover/AppDownloadPopover';
import { useRef } from 'react';
import AvatarMenu from './common/popover/AvatarMenu';
import SettingsDialog from './common/dialog/SettingsDialog';
import CreatePackageDialog from './common/dialog/CreatePackageDialog';
import CreateAnnounceDialog from './common/dialog/CreateAnnounceDialog';
import AnnounceTypeDropdown from './common/popover/AnnounceTypeDropdown';
import LoginDialog from './common/dialog/LoginDialog';
import RegisterDialog from './common/dialog/RegisterDialog';
import { Link } from 'react-router';
import { useAuthStore, type AuthState } from '../store/auth';
import LanguageDropdown from './common/popover/LanguageDropdown';

export default function Header() {
    const { t } = useTranslation();
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
    const [showAnnounceTypeDropdown, setShowAnnounceTypeDropdown] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showMobilePublishOptions, setShowMobilePublishOptions] = useState(false);
    const handleAnnounceTypeSelect = (type: 'travel' | 'package') => {
        if (type === 'travel') {
            setShowCreateAnnounce(true);
        } else if (type === 'package') {
            setShowCreatePackage(true);
        }
    };

    useEffect(() => {
        const onOpenCreateAnnounce = () => setShowCreateAnnounce(true);
        const onOpenLogin = () => setShowLogin(true);
        window.addEventListener('open-create-announce', onOpenCreateAnnounce as EventListener);
        window.addEventListener('open-login-dialog', onOpenLogin as EventListener);
        return () => {
            window.removeEventListener('open-create-announce', onOpenCreateAnnounce as EventListener);
            window.removeEventListener('open-login-dialog', onOpenLogin as EventListener);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/80  border-b border-gray-200 dark:border-gray-800 ">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={"/"} className="flex items-center space-x-3">
                        <div className=" h-10">
                            <img src="/logo.png" alt="Logo" className=" h-10 " />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center flex-1 justify-between px-6 space-x-8">
                        {/* <Link to="/annonces" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
                            Voir les annonces
                        </Link> */}

                        <div className="relative">
                            <button
                                onClick={() => setHoverDownload((v) => !v)}
                                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200"
                                ref={(el) => { (downloadBtnRef as any).current = el; }}
                            >
                                Téléchargez l’appli +
                            </button>
                            <AppDownloadPopover open={hoverDownload} onClose={() => { setHoverDownload(false); setPinnedDownload(false); }} pinned={pinnedDownload} onTogglePin={() => setPinnedDownload((v) => !v)} triggerRef={downloadBtnRef} />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowAnnounceTypeDropdown((v) => !v)}
                                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200"
                            >
                                {t('header.publishAd')}
                            </button>
                            <AnnounceTypeDropdown
                                open={showAnnounceTypeDropdown}
                                onClose={() => setShowAnnounceTypeDropdown(false)}
                                onSelectType={handleAnnounceTypeSelect}
                            />
                        </div>

                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4 relative">
                        {/* Notifications - Only show if logged in */}
                        {isLoggedIn && (
                            <div className="relative">
                                <button
                                    className="text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative text-sm"
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
                        )}
                        <>
                            <div className="w-px h-6 bg-gray-300"></div>
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50 text-sm"
                                    onClick={() => setShowAvatarMenu((v) => !v)}
                                    aria-label="Ouvrir le menu du compte"
                                >
                                    {isLoggedIn ? (
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32&h=32&fit=crop&crop=face"
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                    <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <AvatarMenu
                                    open={showAvatarMenu}
                                    onClose={() => setShowAvatarMenu(false)}
                                    onOpenSettings={() => setShowSettings(true)}
                                    isLoggedIn={isLoggedIn}
                                    onOpenLogin={() => setShowLogin(true)}
                                    onOpenRegister={() => setShowRegister(true)}
                                />

                            </div>
                        </>
                        <LanguageDropdown />
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
                    <LoginDialog
                        open={showLogin}
                        onClose={() => setShowLogin(false)}
                        onSwitchToRegister={() => {
                            setShowLogin(false);
                            setShowRegister(true);
                        }}
                    />
                    <RegisterDialog
                        open={showRegister}
                        onClose={() => setShowRegister(false)}
                        onSwitchToLogin={() => {
                            setShowRegister(false);
                            setShowLogin(true);
                        }}
                    />
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <a href="/annonces" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Voir les annonces
                            </a>
                            <button
                                onClick={() => setShowMobilePublishOptions((v) => !v)}
                                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                            >
                                {t('header.publishAd')}
                                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {showMobilePublishOptions && (
                                <div className="pl-3 space-y-1">
                                    <button
                                        onClick={() => { setShowCreateAnnounce(true); setIsMenuOpen(false); }}
                                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    >
                                        Publier un trajet
                                    </button>
                                    <button
                                        onClick={() => { setShowCreatePackage(true); setIsMenuOpen(false); }}
                                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    >
                                        Publier un colis
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => { setPinnedDownload(true); setHoverDownload((v) => !v); }}
                                className="block w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                                ref={(el) => { (downloadBtnRef as any).current = el; }}
                            >
                                Téléchargez l’appli
                            </button>
                            {/* <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Envoyer un colis
                            </a>
                            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Transporter
                            </a> */}
                            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                Comment ça marche
                            </a>
                            {!isLoggedIn && (
                                <button
                                    onClick={() => { setShowLogin(true); setIsMenuOpen(false); }}
                                    className="block w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Se connecter
                                </button>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </header>
    );
} 