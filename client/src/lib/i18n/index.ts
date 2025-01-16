import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslations } from './translations/en';
import { thTranslations } from './translations/th';
import { validateTranslations } from './utils';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      th: {
        translation: thTranslations,
      }
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false
    }
  });

// Validate translations in development
if (process.env.NODE_ENV === 'development') {
  validateTranslations();
}

export default i18n;