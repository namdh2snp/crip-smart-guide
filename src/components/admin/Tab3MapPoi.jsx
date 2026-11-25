import React, { useState, useRef, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check, Plus, Trash2, MapPin, Crosshair } from 'lucide-react';

const clone = (val) => JSON.parse(JSON.stringify(val || []));

export default function Tab3MapPoi() {
  const { config, updateConfig } = useConfig();
  const [pois, setPois] = useState(() => clone(config.mapPois));
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    setPois(clone(config.mapPois));
  }, [config]);

  const handleMapClick = (e) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const xPercent = Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100)));
    const yPercent = Math.min(100, Math.max(0, Math.round((clickY / rect.height) * 100)));

    if (pois[selectedPoiIndex]) {
      const updated = [...pois];
      updated[selectedPoiIndex].x = xPercent;
      updated[selectedPoiIndex].y = yPercent;
      setPois(updated);
    }
  };

  const handleAddPoi = () => {
    const newPoi = {
      id: 'poi_' + Date.now(),
      category: 'currency',
      icon: 'BadgeDollarSign',
      x: 50,
      y: 50,
      name: {
        vi: 'Điểm Tiện Ích Mới',
        en: 'New Facility',
        zh: '新设施',
        kr: '새 편의시설'
      },
      description: {
        vi: 'Mô tả vị trí và dịch vụ.',
        en: 'Facility description.',
        zh: '设施位置与服务说明。',
        kr: '시설 위치 및 서비스 안내.'
      }
    };
    const nextPois = [...pois, newPoi];
    setPois(nextPois);
    setSelectedPoiIndex(nextPois.length - 1);
  };

  const handleRemovePoi = (index) => {
    const filtered = pois.filter((_, i) => i !== index);
    setPois(filtered);
    setSelectedPoiIndex(Math.max(0, index - 1));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateConfig({
      ...config,
      mapPois: pois
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentPoi = pois[selectedPoiIndex];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-sm text-navy uppercase tracking-wider">
              3. SƠ ĐỒ NHÀ GA & CHẤM TỌA ĐỘ ĐIỂM TIỆN ÍCH (POI)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              💡 <strong>Hướng dẫn:</strong> Chọn điểm POI ở danh sách bên dưới, sau đó <strong>nhấp chuột trực tiếp lên ảnh sơ đồ</strong> để gán tọa độ X%, Y% chính xác.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddPoi}
            className="bg-teal hover:bg-teal-dark text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center space-x-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Điểm Mới</span>
          </button>
        </div>

        {/* Interactive Click-to-Pin Canvas */}
        <div
          ref={mapContainerRef}
          onClick={handleMapClick}
          className="relative w-full rounded-2xl overflow-hidden border-2 border-teal cursor-crosshair bg-slate-100 select-none shadow-md group"
          title="Nhấp chuột vào đây để đặt tọa độ cho điểm POI đang chọn"
        >
          <img
            src="/crip-map.png"
            alt="CRIP Terminal Plan"
            className="w-full h-auto block pointer-events-none"
          />

          {/* Render All POI Pins */}
          {pois.map((poi, idx) => {
            const isSelected = selectedPoiIndex === idx;
            return (
              <div
                key={poi.id || idx}
                style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPoiIndex(idx);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-transform z-30 flex items-center justify-center ${
                  isSelected
                    ? 'bg-sos text-white ring-4 ring-sos/40 scale-125 z-40'
                    : 'bg-navy text-white hover:bg-teal ring-2 ring-white scale-100'
                }`}
                title={`#${idx + 1}: ${poi.name?.vi} (${poi.x}%, ${poi.y}%)`}
              >
                <MapPin className="w-4 h-4" />
                <span className="absolute -bottom-5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.2 rounded whitespace-nowrap">
                  {idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* POI Selection Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {pois.map((poi, idx) => (
            <button
              key={poi.id || idx}
              type="button"
              onClick={() => setSelectedPoiIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedPoiIndex === idx
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              #{idx + 1}: {poi.name?.vi || 'Điểm ' + (idx + 1)}
            </button>
          ))}
        </div>

        {/* Edit Form for Selected POI */}
        {currentPoi && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-extrabold text-xs text-navy uppercase flex items-center space-x-1">
                <Crosshair className="w-4 h-4 text-teal" />
                <span>CHỈNH SỬA ĐIỂM #{selectedPoiIndex + 1} (TỌA ĐỘ: X={currentPoi.x}%, Y={currentPoi.y}%)</span>
              </span>
              {pois.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePoi(selectedPoiIndex)}
                  className="text-rose-500 hover:text-rose-700 text-xs font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa Điểm Này</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Tên Tiếng Việt (VI):</label>
                <input
                  type="text"
                  value={currentPoi.name?.vi || ''}
                  onChange={(e) => {
                    const updated = [...pois];
                    updated[selectedPoiIndex].name.vi = e.target.value;
                    setPois(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Tên Tiếng Anh (EN):</label>
                <input
                  type="text"
                  value={currentPoi.name?.en || ''}
                  onChange={(e) => {
                    const updated = [...pois];
                    updated[selectedPoiIndex].name.en = e.target.value;
                    setPois(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Danh Mục / Icon:</label>
                <select
                  value={currentPoi.category}
                  onChange={(e) => {
                    const cat = e.target.value;
                    const iconMap = {
                      currency: 'BadgeDollarSign',
                      sim: 'Smartphone',
                      medical: 'HeartPulse',
                      dutyfree: 'ShoppingBag',
                      wc: 'Sparkles',
                      shuttle: 'Bus'
                    };
                    const updated = [...pois];
                    updated[selectedPoiIndex].category = cat;
                    updated[selectedPoiIndex].icon = iconMap[cat] || 'MapPin';
                    setPois(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                >
                  <option value="currency">ATM / Đổi tiền (BadgeDollarSign)</option>
                  <option value="sim">SIM 4G & Viễn thông (Smartphone)</option>
                  <option value="medical">Y tế & Sơ cứu (HeartPulse)</option>
                  <option value="dutyfree">Miễn thuế & Quà lưu niệm (ShoppingBag)</option>
                  <option value="wc">Nhà vệ sinh WC (Sparkles)</option>
                  <option value="shuttle">Trạm Shuttle Bus (Bus)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Mô tả chi tiết:</label>
              <textarea
                value={currentPoi.description?.vi || ''}
                onChange={(e) => {
                  const updated = [...pois];
                  updated[selectedPoiIndex].description.vi = e.target.value;
                  setPois(updated);
                }}
                rows="2"
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-navy hover:bg-navy-light text-white font-black py-3 px-6 rounded-2xl text-xs uppercase shadow-lg flex items-center space-x-2 transition-all"
        >
          {saved ? <Check className="w-4 h-4 text-teal" /> : <Save className="w-4 h-4 text-teal" />}
          <span>{saved ? 'ĐÃ LƯU TỌA ĐỘ BẢN ĐỒ!' : 'LƯU SƠ ĐỒ & ĐIỂM TIỆN ÍCH'}</span>
        </button>
      </div>
    </form>
  );
}
