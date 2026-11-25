import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check, Plus, Trash2 } from 'lucide-react';

const clone = (val, fallback) => JSON.parse(JSON.stringify(val ?? fallback));

export default function Tab2Logistics() {
  const { config, updateConfig } = useConfig();
  const [logistics, setLogistics] = useState(() => clone(config.logistics, {}));
  const [taxiFares, setTaxiFares] = useState(() => clone(config.taxiFares, []));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLogistics(clone(config.logistics, {}));
    setTaxiFares(clone(config.taxiFares, []));
  }, [config]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateConfig({
      ...config,
      logistics,
      taxiFares
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddTaxi = () => {
    const newTaxi = {
      id: 'taxi_' + Date.now(),
      company: 'Hãng Taxi Mới',
      hotline: '0258 000 000',
      openPrice: '10,000 VND',
      pricePerKm: '15,000 VND/km',
      fixedNhaTrang: '450,000 VND / chuyến',
      fixedCamRanhCity: '250,000 VND / chuyến',
      note: {
        vi: 'Đã bao gồm phí cảng.',
        en: 'Port fee included.'
      }
    };
    setTaxiFares([...taxiFares, newTaxi]);
  };

  const handleRemoveTaxi = (id) => {
    setTaxiFares(taxiFares.filter(t => t.id !== id));
  };

  const handleTaxiChange = (index, field, value) => {
    const updated = [...taxiFares];
    updated[index][field] = value;
    setTaxiFares(updated);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* 1. Free Shuttle Bus Schedule */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          2.1 XE TRUNG CHUYỂN MIỄN PHÍ RA CỔNG (SHUTTLE BUS)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tần suất chạy (phút):</label>
            <input
              type="number"
              value={logistics.shuttleBus?.intervalMinutes || 15}
              onChange={(e) => setLogistics({
                ...logistics,
                shuttleBus: { ...(logistics.shuttleBus || {}), intervalMinutes: Number(e.target.value) }
              })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Khung giờ hoạt động:</label>
            <input
              type="text"
              value={logistics.shuttleBus?.operatingHours || '07:30 - 16:30'}
              onChange={(e) => setLogistics({
                ...logistics,
                shuttleBus: { ...(logistics.shuttleBus || {}), operatingHours: e.target.value }
              })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>
        </div>
      </div>

      {/* 2. Taxi Fares CRUD Table */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider">
            2.2 BẢNG GIÁ TAXI NIÊM YẾT CHÍNH HÃNG
          </h3>
          <button
            type="button"
            onClick={handleAddTaxi}
            className="bg-teal hover:bg-teal-dark text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Hãng Taxi</span>
          </button>
        </div>

        <div className="space-y-4">
          {taxiFares.map((taxi, index) => (
            <div key={taxi.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
              <button
                type="button"
                onClick={() => handleRemoveTaxi(taxi.id)}
                className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                title="Xóa hãng taxi"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Tên Hãng Taxi:</label>
                  <input
                    type="text"
                    value={taxi.company || ''}
                    onChange={(e) => handleTaxiChange(index, 'company', e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Hotline Tổng Đài:</label>
                  <input
                    type="text"
                    value={taxi.hotline || ''}
                    onChange={(e) => handleTaxiChange(index, 'hotline', e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Trọn gói Nha Trang (~45km):</label>
                  <input
                    type="text"
                    value={taxi.fixedNhaTrang || ''}
                    onChange={(e) => handleTaxiChange(index, 'fixedNhaTrang', e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Trọn gói Cam Ranh (~20km):</label>
                  <input
                    type="text"
                    value={taxi.fixedCamRanhCity || ''}
                    onChange={(e) => handleTaxiChange(index, 'fixedCamRanhCity', e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-navy hover:bg-navy-light text-white font-black py-3 px-6 rounded-2xl text-xs uppercase shadow-lg flex items-center space-x-2 transition-all"
        >
          {saved ? <Check className="w-4 h-4 text-teal" /> : <Save className="w-4 h-4 text-teal" />}
          <span>{saved ? 'ĐÃ LƯU THÀNH CÔNG!' : 'LƯU PHÂN LUỒNG & TAXI'}</span>
        </button>
      </div>
    </form>
  );
}
