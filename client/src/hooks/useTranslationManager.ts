import { useCallback } from 'react';
import { translationManager } from '@/lib/i18n/TranslationManager';
import { useTranslation } from 'react-i18next';

export function useTranslationManager() {
  const { t } = useTranslation();

  const addTranslation = useCallback((
    key: string,
    enValue: string,
    thValue: string
  ) => {
    translationManager.addTranslation(key, enValue, thValue);
  }, []);

  const getMissingTranslations = useCallback(() => {
    return translationManager.getMissingTranslations();
  }, []);

  const translateNewContent = useCallback(async (
    key: string,
    enValue: string
  ) => {
    await translationManager.translateNewContent(key, enValue);
  }, []);

  return {
    t,
    addTranslation,
    getMissingTranslations,
    translateNewContent
  };
}
