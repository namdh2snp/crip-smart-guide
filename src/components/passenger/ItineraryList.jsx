import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { Compass, Clock, AlertTriangle, MapPin, CheckCircle } from 'lucide-react';

export default function ItineraryList() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();
  const [selectedDuration, setSelectedDuration] = useState('4h');

  const itineraries = config.itineraries || [];
  const currentItinerary = itineraries.find(i => i.duration === selectedDuration) || itineraries[0];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase text-navy tracking-wider flex items-center space-x-1.5">
          <Compass className="w-4 h-4 text-teal" />
          <span>{t('itinerariesTitle', currentLang)}</span>
        </h2>
        <span className="text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
          Tự do khám phá
        </span>
      </div>

      {/* 3 Duration Buttons (4h / 6h / 8h) */}
      <div className="grid grid-cols-3 gap-2">
        {itineraries.map((item) => {
          const active = selectedDuration === item.duration;
          return (
            <button
              key={item.duration}
              onClick={() => setSelectedDuration(item.duration)}
              className={`py-2 px-3 rounded-2xl font-black text-xs transition-all border ${
                active
                  ? 'bg-navy text-white border-navy shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {item.duration.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Itinerary Details */}
      {currentItinerary && (
        <div className="space-y-3 animate-fadeIn">
          <h3 className="font-extrabold text-sm text-navy leading-snug">
            {currentItinerary.title?.[currentLang] || currentItinerary.title?.en || currentItinerary.title?.vi}
          </h3>

          {/* Safe Return Notice Warning */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-start space-x-2 text-amber-900 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="font-bold">
              {currentItinerary.safeReturnNotice?.[currentLang] || currentItinerary.safeReturnNotice?.en || currentItinerary.safeReturnNotice?.vi}
            </p>
          </div>

          {/* Stops List */}
          <div className="space-y-2.5 pt-1">
            {currentItinerary.stops?.map((stop, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-teal text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-navy">
                      {stop.name?.[currentLang] || stop.name?.en || stop.name?.vi}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      ~{stop.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {stop.desc?.[currentLang] || stop.desc?.en || stop.desc?.vi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
