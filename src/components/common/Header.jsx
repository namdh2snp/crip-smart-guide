import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useConfig } from '../../context/ConfigContext';
import { AlertCircle, Globe } from 'lucide-react';

export default function Header({ onOpenEmergency }) {
  const { currentLang, changeLanguage, supportedLanguages } = useLanguage();
  const { t } = useConfig();

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-md border-b border-navy-light/40">
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images/crip-logo.svg" alt="CRIP Logo" className="h-9 w-auto" />
        </div>

        {/* Actions: Lang Switcher & SOS */}
        <div className="flex items-center space-x-2">
          {/* 4-Language Pill Switcher */}
          <div className="flex items-center bg-navy-light/60 p-0.5 rounded-full border border-navy-light">
            {supportedLanguages.map((lang) => {
              const active = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-bold rounded-full transition-all flex items-center space-x-1 ${
                    active
                      ? 'bg-teal text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={lang.label}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.short}</span>
                </button>
              );
            })}
          </div>

          {/* SOS Quick Button */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center space-x-1 bg-sos hover:bg-sos-dark active:scale-95 text-white text-xs font-black px-3 py-2 rounded-full shadow-lg animate-pulse transition-all"
          >
            <AlertCircle className="w-4 h-4" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
