import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check } from 'lucide-react';

export default function Tab5Phrases() {
  const { config, updateConfig } = useConfig();
  const [rates, setRates] = useState({ ...config.currencyRates });
  const [phrases, setPhrases] = useState([...config.phraseCards]);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateConfig({
      ...config,
      currencyRates: rates,
      phraseCards: phrases
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Currency Exchange Rates */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          5.1 TỶ GIÁ NGOẠI TỆ QUY ĐỔI (SO VỚI 1 ĐƠN VỊ NGOẠI TỆ = ? VND)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">1 USD (Đô la Mỹ):</label>
            <input
              type="number"
              value={rates.USD || 25400}
              onChange={(e) => setRates({ ...rates, USD: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">1 CNY (Nhân dân tệ):</label>
            <input
              type="number"
              value={rates.CNY || 3500}
              onChange={(e) => setRates({ ...rates, CNY: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">1 KRW (Won Hàn Quốc):</label>
            <input
              type="number"
              step="0.1"
              value={rates.KRW || 18.2}
              onChange={(e) => setRates({ ...rates, KRW: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>
        </div>
      </div>

      {/* Phrase Cards */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          5.2 DANH SÁCH THẺ GIAO TIẾP TIẾNG VIỆT KHỔ LỚN
        </h3>

        <div className="space-y-3">
          {phrases.map((card, idx) => (
            <div key={card.id || idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600">Câu Tiếng Việt khổ lớn:</label>
                  <input
                    type="text"
                    value={card.vietnamese || ''}
                    onChange={(e) => {
                      const updated = [...phrases];
                      updated[idx].vietnamese = e.target.value;
                      setPhrases(updated);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600">Phiên âm quốc tế:</label>
                  <input
                    type="text"
                    value={card.phonetic || ''}
                    onChange={(e) => {
                      const updated = [...phrases];
                      updated[idx].phonetic = e.target.value;
                      setPhrases(updated);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-navy hover:bg-navy-light text-white font-black py-3 px-6 rounded-2xl text-xs uppercase shadow-lg flex items-center space-x-2 transition-all"
        >
          {saved ? <Check className="w-4 h-4 text-teal" /> : <Save className="w-4 h-4 text-teal" />}
          <span>{saved ? 'ĐÃ LƯU THÀNH CÔNG!' : 'LƯU TỶ GIÁ & THẺ NÓI'}</span>
        </button>
      </div>
    </form>
  );
}
