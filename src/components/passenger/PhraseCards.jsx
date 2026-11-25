import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { speakVietnamese } from '../../utils/speech';
import { Volume2, VolumeX, MessageSquareQuote, Check } from 'lucide-react';

export default function PhraseCards() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();
  const [playingId, setPlayingId] = useState(null);

  const phrases = config.phraseCards || [];

  const handleSpeak = (phrase) => {
    setPlayingId(phrase.id);
    speakVietnamese(phrase.speechText || phrase.vietnamese, () => {
      setPlayingId(null);
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase text-navy tracking-wider flex items-center space-x-1.5">
          <MessageSquareQuote className="w-4 h-4 text-teal" />
          <span>{t('phrasesTitle', currentLang)}</span>
        </h2>
        <span className="text-[11px] text-slate-500 font-medium">Bấm loa để phát âm</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {phrases.map((card) => {
          const isPlaying = playingId === card.id;
          const translatedMeaning = card.meaning?.[currentLang] || card.meaning?.en || '';

          return (
            <div
              key={card.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                card.category === 'urgent'
                  ? 'bg-rose-50/70 border-sos/40 shadow-sm'
                  : 'bg-slate-50/80 border-slate-200 hover:border-teal/50'
              }`}
            >
              <div>
                {/* Meaning in tourist's language */}
                {translatedMeaning && (
                  <p className="text-xs font-bold text-slate-600 mb-1.5 line-clamp-2">
                    {translatedMeaning}
                  </p>
                )}

                {/* Giant Vietnamese Text */}
                <h3 className="text-base sm:text-lg font-black text-navy tracking-tight leading-snug">
                  {card.vietnamese}
                </h3>

                {/* Phonetics */}
                {card.phonetic && (
                  <p className="text-xs text-teal-dark font-medium italic mt-1">
                    "{card.phonetic}"
                  </p>
                )}
              </div>

              {/* Audio button */}
              <div className="pt-3 mt-2 border-t border-slate-200/60 flex justify-end">
                <button
                  onClick={() => handleSpeak(card)}
                  className={`flex items-center space-x-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    isPlaying
                      ? 'bg-teal text-white shadow scale-95'
                      : 'bg-white hover:bg-slate-100 text-navy border border-slate-200 shadow-sm'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-white' : 'text-teal'}`} />
                  <span>{isPlaying ? 'Đang phát...' : t('speakButton', currentLang)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
