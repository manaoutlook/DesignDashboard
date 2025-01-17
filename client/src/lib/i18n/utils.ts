import i18next from 'i18next';
import { enTranslations } from './translations/en';
import { thTranslations } from './translations/th';

type TranslationObject = Record<string, any>;

export function findMissingTranslations(
  baseTranslations: TranslationObject,
  compareTranslations: TranslationObject,
  currentPath: string = ''
): string[] {
  const missingKeys: string[] = [];

  Object.keys(baseTranslations).forEach((key) => {
    const newPath = currentPath ? `${currentPath}.${key}` : key;

    if (!(key in compareTranslations)) {
      missingKeys.push(newPath);
    } else if (
      typeof baseTranslations[key] === 'object' &&
      typeof compareTranslations[key] === 'object'
    ) {
      missingKeys.push(
        ...findMissingTranslations(
          baseTranslations[key],
          compareTranslations[key],
          newPath
        )
      );
    }
  });

  return missingKeys;
}

export function validateTranslations() {
  const missingInThai = findMissingTranslations(enTranslations, thTranslations);
  
  if (missingInThai.length > 0) {
    console.warn('Missing Thai translations for keys:', missingInThai);
  }

  // Check for any extra keys in Thai that don't exist in English
  const extraInThai = findMissingTranslations(thTranslations, enTranslations);
  
  if (extraInThai.length > 0) {
    console.warn('Extra Thai translations for keys:', extraInThai);
  }
}

export function addNewTranslation(
  key: string,
  enValue: string,
  thValue: string
) {
  const keys = key.split('.');
  let currentEnObj = enTranslations;
  let currentThObj = thTranslations;

  // Create nested structure if it doesn't exist
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!currentEnObj[k]) currentEnObj[k] = {};
    if (!currentThObj[k]) currentThObj[k] = {};
    currentEnObj = currentEnObj[k];
    currentThObj = currentThObj[k];
  }

  // Add the new translation
  const lastKey = keys[keys.length - 1];
  currentEnObj[lastKey] = enValue;
  currentThObj[lastKey] = thValue;

  // Reload translations
  i18next.reloadResources(['en', 'th']);
}
