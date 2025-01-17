import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GB, TH } from 'country-flag-icons/react/3x2';
import { useEffect, useState } from 'react';
import { useTranslationManager } from '@/hooks/useTranslationManager';
import { AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const { getMissingTranslations } = useTranslationManager();
  const [isThaiLanguage, setIsThaiLanguage] = useState(i18n.language === 'th');
  const [missingTranslations, setMissingTranslations] = useState<string[]>([]);

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

  // Check for missing translations in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setMissingTranslations(getMissingTranslations());
    }
  }, [getMissingTranslations, i18n.language]);

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
      {process.env.NODE_ENV === 'development' && missingTranslations.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Missing translations: {missingTranslations.length}</p>
              <ul className="text-xs mt-1">
                {missingTranslations.slice(0, 3).map((key) => (
                  <li key={key}>{key}</li>
                ))}
                {missingTranslations.length > 3 && (
                  <li>... and {missingTranslations.length - 3} more</li>
                )}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}