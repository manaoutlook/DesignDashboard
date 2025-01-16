import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GB, TH } from 'country-flag-icons/react/3x2';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'th' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex items-center space-x-2">
      <GB className="w-5 h-5" />
      <Switch
        checked={i18n.language === 'th'}
        onCheckedChange={toggleLanguage}
        id="language-toggle"
      />
      <TH className="w-5 h-5" />
      <Label htmlFor="language-toggle" className="text-sm font-medium">
        {t('common.language')}
      </Label>
    </div>
  );
}
