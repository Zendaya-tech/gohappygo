import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    // Sauvegarder la langue dans localStorage
    localStorage.setItem('i18nextLng', language);
  }, [i18n]);

  const currentLanguage = i18n.language;

  return {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr'
  };
};
