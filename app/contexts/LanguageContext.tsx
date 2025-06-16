'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ru' | 'ko' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: {
    artworks: string;
    photography: string;
    music: string;
    contact: string;
  };
}

const translations = {
  en: {
    artworks: 'artworks',
    photography: 'photography',
    music: 'music',
    contact: 'contact'
  },
  fr: {
    artworks: 'œuvres',
    photography: 'photographie',
    music: 'musique',
    contact: 'contact'
  },
  ru: {
    artworks: 'Произведения',
    photography: 'Фотоработы',
    music: 'музыка',
    contact: 'контакт'
  },
  ko: {
    artworks: '작품',
    photography: '사진',
    music: '음악',
    contact: '연락처'
  },
  zh: {
    artworks: '作品',
    photography: '摄影',
    music: '音乐',
    contact: '联系'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    console.log('Changing language to:', lang);
    setLanguageState(lang);
  };

  const value = {
    language,
    setLanguage,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 