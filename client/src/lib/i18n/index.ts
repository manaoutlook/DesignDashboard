import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  common: {
    language: 'Language',
    dashboard: 'Dashboard',
    locations: 'Locations',
    cars: 'Cars',
    spareParts: 'Spare Parts',
    overview: 'Overview',
    revenue: 'Revenue',
    activities: 'Activities',
    settings: 'Settings',
  },
};

// Thai translations
const thTranslations = {
  common: {
    language: 'ภาษา',
    dashboard: 'แดชบอร์ด',
    locations: 'สถานที่',
    cars: 'รถยนต์',
    spareParts: 'อะไหล่',
    overview: 'ภาพรวม',
    revenue: 'รายได้',
    activities: 'กิจกรรม',
    settings: 'การตั้งค่า',
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      th: thTranslations,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  });

export default i18n;
