import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check } from 'lucide-react';

const clone = (val) => JSON.parse(JSON.stringify(val || []));

export default function Tab4Itinerary() {
  const { config, updateConfig } = useConfig();
  const [itineraries, setItineraries] = useState(() => clone(config.itineraries));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItineraries(clone(config.itineraries));
  }, [config]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateConfig({
      ...config,
      itineraries
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...itineraries];
    updated[index][field] = value;
    setItineraries(updated);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          4. LỊCH TRÌNH KHÁM PHÁ THEO QUỸ THỜI GIAN (4H / 6H / 8H)
        </h3>

        <div className="space-y-4">
          {itineraries.map((itinerary, index) => (
            <div key={itinerary.duration} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="inline-block bg-navy text-white text-xs font-black px-2.5 py-1 rounded-lg uppercase">
                GỢI Ý LỊCH TRÌNH {itinerary.duration.toUpperCase()}
              </span>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Tiêu đề Lịch trình (VI):</label>
                <input
                  type="text"
                  value={itinerary.title?.vi || ''}
                  onChange={(e) => {
                    const updated = [...itineraries];
                    updated[index].title.vi = e.target.value;
                    setItineraries(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-700 mb-0.5">Cảnh báo mốc giờ an toàn phải về cảng:</label>
                <input
                  type="text"
                  value={itinerary.safeReturnNotice?.vi || ''}
                  onChange={(e) => {
                    const updated = [...itineraries];
                    updated[index].safeReturnNotice.vi = e.target.value;
                    setItineraries(updated);
                  }}
                  className="w-full bg-amber-50 border border-amber-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-amber-900"
                />
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
          <span>{saved ? 'ĐÃ LƯU THÀNH CÔNG!' : 'LƯU LỊCH TRÌNH DU LỊCH'}</span>
        </button>
      </div>
    </form>
  );
}
