import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSearch = () => {
        navigate('/annonces');
    };

    return (
        <section className="relative   py-16 px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-poppins">
                        Emportez autant de bagages que vous le Desirez avec  <span className="text-blue-600 text-5xl font-black"> GoHappyGo </span>
                        lors de votre voyage
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 line-clamp-2">
                        {t('home.hero.subtitle')}
                    </p>


                </div>

                {/* Hero Images */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-48 overflow-hidden">
                            <img src="/images/history-converted.webp" alt="Avion en vol" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-42 overflow-hidden">
                            <img src="/images/rencontre2-converted.webp" alt="Valise" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="space-y-4 mt-8">
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-32 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=200&fit=crop" alt="Colis" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-44 overflow-hidden">
                            <img src="/images/rencontre1-converted.webp" alt="Aéroport" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Form */}
            <div className="bg-white max-w-7xl mx-auto  dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-6 mt-7 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('home.hero.searchFrom')}</label>
                        <input
                            type="text"
                            placeholder={t('home.hero.fromPlaceholder')}
                            className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                        />
                    </div>
                    <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('home.hero.searchTo')}</label>
                        <input
                            type="text"
                            placeholder={t('home.hero.toPlaceholder')}
                            className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                        />
                    </div>
                    <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('home.hero.searchDate')}</label>
                        <input
                            type="text"
                            placeholder={t('home.hero.datePlaceholder')}
                            className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                        />
                    </div>
                    <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('home.hero.searchFlight')}</label>
                        <input
                            type="text"
                            placeholder={t('home.hero.flightPlaceholder')}
                            className="w-full text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 truncate"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="min-w-0">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">{t('home.hero.searchButton')}</label>
                            <span className="text-sm text-gray-600 dark:text-gray-300 truncate block">Trouver un voyageur</span>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
} 