import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Navigation, Info, X, BadgeDollarSign, Smartphone, HeartPulse, ShoppingBag, Sparkles, Bus } from 'lucide-react';

const ICON_MAP = {
  BadgeDollarSign: BadgeDollarSign,
  Smartphone: Smartphone,
  HeartPulse: HeartPulse,
  ShoppingBag: ShoppingBag,
  Sparkles: Sparkles,
  Bus: Bus
};

export default function TerminalMap() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPoi, setSelectedPoi] = useState(null);

  const pois = config.mapPois || [];

  const categories = [
    { key: 'all', label: t('filterAll', currentLang) },
    { key: 'currency', label: t('filterCurrency', currentLang) },
    { key: 'sim', label: t('filterSim', currentLang) },
    { key: 'medical', label: t('filterMedical', currentLang) },
    { key: 'dutyfree', label: t('filterDutyfree', currentLang) },
    { key: 'wc', label: t('filterWc', currentLang) },
    { key: 'shuttle', label: t('filterShuttle', currentLang) },
  ];

  const filteredPois = activeCategory === 'all'
    ? pois
    : pois.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase text-navy tracking-wider flex items-center space-x-1.5">
          <Navigation className="w-4 h-4 text-teal" />
          <span>{t('terminalMapTitle', currentLang)}</span>
        </h2>
        <span className="text-[11px] text-slate-500 font-medium">Chạm điểm để xem chi tiết</span>
      </div>

      {/* Filter Horizontal Scrolling Pills */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => {
          const active = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setSelectedPoi(null);
              }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-full shrink-0 transition-all ${
                active
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Map Graphic Canvas */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-100 select-none shadow-inner">
        {/* Base Map Graphic */}
        <img
          src="/crip-map.png"
          alt="CRIP Terminal Map"
          className="w-full h-auto block pointer-events-none"
        />

        {/* POI Relative Markers */}
        {filteredPois.map(poi => {
          const IconComp = ICON_MAP[poi.icon] || MapPin;
          const isSelected = selectedPoi?.id === poi.id;

          return (
            <button
              key={poi.id}
              onClick={() => setSelectedPoi(poi)}
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 shadow-xl transition-all z-20 flex items-center justify-center ${
                isSelected
                  ? 'bg-sos text-white scale-125 ring-4 ring-sos/40 z-30'
                  : 'bg-navy text-white hover:bg-teal hover:scale-110 ring-2 ring-white'
              }`}
              title={poi.name?.[currentLang] || poi.name?.en}
            >
              <IconComp className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* POI Selected Popup Card */}
      {selectedPoi && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-teal/40 animate-fadeIn relative">
          <button
            onClick={() => setSelectedPoi(null)}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start space-x-3 pr-6">
            <div className="p-2.5 bg-teal text-white rounded-xl shrink-0 mt-0.5">
              {React.createElement(ICON_MAP[selectedPoi.icon] || MapPin, { className: "w-5 h-5" })}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-teal-light">
                {selectedPoi.name?.[currentLang] || selectedPoi.name?.en || selectedPoi.name?.vi}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedPoi.description?.[currentLang] || selectedPoi.description?.en || selectedPoi.description?.vi}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
