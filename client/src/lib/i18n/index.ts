import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslations } from './translations/en';
import { thTranslations } from './translations/th';

// Initialize i18next
void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    defaultNS: 'translation',
    resources: {
      en: {
        translation: enTranslations,
      },
      th: {
        translation: thTranslations,
      }
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    }
  });

// Log the current language in development
if (process.env.NODE_ENV === 'development') {
  i18n.on('languageChanged', (lng) => {
    console.log('Language changed to:', lng);
    console.log('Available translations:', Object.keys(i18n.store.data));
  });
}

export default i18n;