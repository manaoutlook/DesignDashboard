import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GB, TH } from 'country-flag-icons/react/3x2';
import { useEffect, useState } from 'react';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const [isThaiLanguage, setIsThaiLanguage] = useState(i18n.language === 'th');

  const toggleLanguage = () => {
    const newLang = isThaiLanguage ? 'en' : 'th';
    setIsThaiLanguage(!isThaiLanguage);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  // Initialize language from localStorage or default to 'en'
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    setIsThaiLanguage(savedLang === 'th');
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  return (
    <div className="flex items-center space-x-2">
      <GB className="w-5 h-5" />
      <Switch
        checked={isThaiLanguage}
        onCheckedChange={toggleLanguage}
        id="language-toggle"
        aria-label={t('common.language')}
      />
      <TH className="w-5 h-5" />
      <Label htmlFor="language-toggle" className="text-sm font-medium">
        {t('common.language')}
      </Label>
    </div>
  );
}