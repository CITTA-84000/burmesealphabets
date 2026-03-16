declare global {
  interface Window {
    aistudio: {
      openSelectKey: () => void;
      saveApiKey: (key: string) => void;
    }
  }
}

export type Language = 
  | 'Kachin'
  | 'Karenni (Kayah)'
  | 'Karen (Kayin)'
  | 'Chin (Hakha)'
  | 'Chin (Tedim)'
  | 'Mon'
  | 'Myanmar'
  | 'Rakhine'
  | 'Shan'
  | 'English';

export interface TranslationResult {
  translatedText: string;
  pronunciation: string;
  culturalNote: string;
}

export interface LanguageSpotlight {
  name: Language;
  phrase: string;
  pronunciation: string;
  script: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  'Kachin',
  'Karenni (Kayah)',
  'Karen (Kayin)',
  'Chin (Hakha)',
  'Chin (Tedim)',
  'Mon',
  'Myanmar',
  'Rakhine',
  'Shan',
  'English'
];
