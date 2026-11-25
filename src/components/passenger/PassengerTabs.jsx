import React, { useRef, useEffect } from 'react';
import {
  Anchor,
  Bus,
  MapPin,
  Compass,
  MessageSquareQuote,
  Calculator,
  ShieldAlert,
  Smile
} from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';

export const PASSENGER_TABS = [
  { id: 'ship', labelKey: 'navShip', icon: Anchor },
  { id: 'logistics', labelKey: 'navLogistics', icon: Bus },
  { id: 'map', labelKey: 'navMap', icon: MapPin },
  { id: 'itinerary', labelKey: 'navItinerary', icon: Compass },
  { id: 'phrases', labelKey: 'navPhrases', icon: MessageSquareQuote },
  { id: 'currency', labelKey: 'navCurrency', icon: Calculator },
  { id: 'safety', labelKey: 'navSafety', icon: ShieldAlert, urgentAccent: true },
  { id: 'feedback', labelKey: 'navFeedback', icon: Smile },
];

export default function PassengerTabs({ activeTab, onSelectTab }) {
  const { t } = useConfig();
  const { currentLang } = useLanguage();
  const activeBtnRef = useRef(null);

  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  return (
    <nav
      aria-label="Danh mục chức năng hành khách"
      className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
    >
      <div className="max-w-xl mx-auto px-3 py-2">
        <div
          role="tablist"
          className="flex items-center space-x-2 overflow-x-auto no-scrollbar"
        >
          {PASSENGER_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={active ? activeBtnRef : null}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold shrink-0 flex items-center space-x-1.5 transition-all active:scale-95 ${
                  active
                    ? tab.urgentAccent
                      ? 'bg-sos text-white shadow-md ring-2 ring-sos/30'
                      : 'bg-navy text-white shadow-md ring-2 ring-teal/30'
                    : tab.urgentAccent
                    ? 'bg-rose-50 text-sos hover:bg-rose-100 border border-rose-200'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    active
                      ? tab.urgentAccent
                        ? 'text-white'
                        : 'text-teal'
                      : tab.urgentAccent
                      ? 'text-sos'
                      : 'text-slate-400'
                  }`}
                />
                <span className="whitespace-nowrap">
                  {t(tab.labelKey, currentLang)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
