import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useConfig } from '../../context/ConfigContext';
import { Navigation, PhoneCall, ShieldAlert } from 'lucide-react';

export default function BottomBar({ onOpenEmergency }) {
  const { currentLang } = useLanguage();
  const { t } = useConfig();

  return (
    <aside aria-label="Khẩn cấp và hồi cảng" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-4">
      <div className="max-w-xl mx-auto flex items-center space-x-3">
        {/* Big "Take me back to Port" Button */}
        <button
          onClick={onOpenEmergency}
          className="flex-1 bg-navy hover:bg-navy-light active:scale-[0.98] text-white font-black py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all"
        >
          <Navigation className="w-5 h-5 text-teal" />
          <span className="text-sm tracking-wide uppercase font-extrabold text-teal-light">
            {t('takeMeBackBtn', currentLang)}
          </span>
        </button>

        {/* SOS Hotline Direct Trigger */}
        <button
          onClick={onOpenEmergency}
          className="bg-sos hover:bg-sos-dark active:scale-95 text-white font-black py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-all"
        >
          <PhoneCall className="w-5 h-5 animate-bounce" />
          <span className="text-sm font-black">SOS</span>
        </button>
      </div>
    </aside>
  );
}
