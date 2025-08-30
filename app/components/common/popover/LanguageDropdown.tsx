import { useEffect, useState } from 'react';
import { countries } from 'country-flag-icons';

interface Language {
    code: string;
    name: string;
    countryCode: string;
}

interface LanguageDropdownProps {
    currentLanguage: string;
    onLanguageChange: (languageCode: string) => void;
}

export default function LanguageDropdown({ currentLanguage, onLanguageChange }: LanguageDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const languages: Language[] = [
        { code: 'fr', name: 'Français', countryCode: 'FR' },
        { code: 'en', name: 'English', countryCode: 'US' },
        { code: 'es', name: 'Español', countryCode: 'ES' },
        { code: 'de', name: 'Deutsch', countryCode: 'DE' },
        { code: 'it', name: 'Italiano', countryCode: 'IT' }
    ];

    const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isOpen && !target.closest('.language-dropdown')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleLanguageSelect = (languageCode: string) => {
        onLanguageChange(languageCode);
        setIsOpen(false);
    };

    return (
        <div className="relative language-dropdown">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 font-medium text-sm"
            >
                <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${currentLang.countryCode}.svg`} alt={currentLang.name} className="w-5 h-4 object-cover rounded-sm" />


                <span>{currentLang.name}</span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Language Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageSelect(language.code)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 ${currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                }`}
                        >
                            <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${language.countryCode}.svg`} alt={language.name} className="w-5 h-4 object-cover rounded-sm" />
                            <span className="font-medium">{language.name}</span>
                            {currentLanguage === language.code && (
                                <svg className="w-4 h-4 ml-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
