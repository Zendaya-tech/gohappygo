import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock logged in state

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <a href="/" className="font-bold text-xl text-gray-900">Go Happy Go</a>
                            <span className="text-xs text-gray-500 -mt-1">Voyagez ensemble, partagez l'espace</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/annonces" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Voir les annonces
                        </a>
                        {/* <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Envoyer un colis
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Transporter
                        </a> */}
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Comment ça marche
                        </a>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <a href="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                                    Mon profil
                                </a>
                                <div className="w-px h-6 bg-gray-300"></div>
                                <div className="flex items-center space-x-2">
                                    <a href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32&h=32&fit=crop&crop=face"
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Marie</span>
                                    </a>
                                    <button
                                        onClick={() => setIsLoggedIn(false)}
                                        className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
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
                            <div className="border-t border-gray-200 pt-2">
                                {isLoggedIn ? (
                                    <>
                                        <a href="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                            Mon profil
                                        </a>
                                        <button
                                            onClick={() => setIsLoggedIn(false)}
                                            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            Se déconnecter
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a href="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                            Se connecter
                                        </a>
                                        <a href="/register" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                                            S'inscrire
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
} 