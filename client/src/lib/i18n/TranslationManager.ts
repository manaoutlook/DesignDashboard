import i18next from 'i18next';
import { enTranslations } from './translations/en';
import { thTranslations } from './translations/th';
import { findMissingTranslations, addNewTranslation } from './utils';

class TranslationManager {
  private static instance: TranslationManager;
  private missingTranslations: string[] = [];

  private constructor() {
    this.validateTranslations();
  }

  public static getInstance(): TranslationManager {
    if (!TranslationManager.instance) {
      TranslationManager.instance = new TranslationManager();
    }
    return TranslationManager.instance;
  }

  public validateTranslations(): void {
    const missingInThai = findMissingTranslations(enTranslations, thTranslations);
    if (missingInThai.length > 0) {
      console.warn('Missing Thai translations for keys:', missingInThai);
      this.missingTranslations = missingInThai;
    }
  }

  public getMissingTranslations(): string[] {
    return this.missingTranslations;
  }

  public addTranslation(key: string, enValue: string, thValue: string): void {
    addNewTranslation(key, enValue, thValue);
    this.validateTranslations();
  }

  public async translateNewContent(key: string, enValue: string): Promise<void> {
    // In development, this would integrate with a translation service
    // For now, we'll add a placeholder Thai translation
    const thValue = `[TH] ${enValue}`;
    this.addTranslation(key, enValue, thValue);
  }
}

export const translationManager = TranslationManager.getInstance();
