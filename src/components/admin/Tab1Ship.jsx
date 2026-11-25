import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check, AlertCircle } from 'lucide-react';

const clone = (val) => JSON.parse(JSON.stringify(val || {}));

export default function Tab1Ship() {
  const { config, updateConfig } = useConfig();
  const [ship, setShip] = useState(() => clone(config.ship));
  const [wifi, setWifi] = useState(() => clone(config.wifi));
  const [alertConfig, setAlertConfig] = useState(() => clone(config.emergencyAlert));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setShip(clone(config.ship));
    setWifi(clone(config.wifi));
    setAlertConfig(clone(config.emergencyAlert));
  }, [config]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateConfig({
      ...config,
      ship,
      wifi,
      emergencyAlert: alertConfig
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* 1. Voyage Info */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          1.1 THÔNG TIN CHUYẾN TÀU VÀ GIỜ ALL ABOARD
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tên Tàu Du Lịch:</label>
            <input
              type="text"
              value={ship.name || ''}
              onChange={(e) => setShip({ ...ship, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Vị trí Cầu Bến:</label>
            <input
              type="text"
              value={ship.berth || ''}
              onChange={(e) => setShip({ ...ship, berth: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nhiệt độ Thời tiết:</label>
            <input
              type="text"
              value={ship.weather?.temp || ''}
              onChange={(e) => setShip({
                ...ship,
                weather: { ...(ship.weather || {}), temp: e.target.value }
              })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-600 mb-1">
              Giờ Tất Cả Về Tàu (All Aboard Cutoff - HH:mm):
            </label>
            <input
              type="text"
              placeholder="VD: 17:30"
              value={ship.allAboardTime || ''}
              onChange={(e) => setShip({ ...ship, allAboardTime: e.target.value })}
              className="w-full bg-amber-50 border-2 border-amber-400 rounded-xl px-3 py-2 text-sm font-black text-navy"
            />
          </div>
        </div>
      </div>

      {/* 2. Wi-Fi Config */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          1.2 THÔNG TIN WI-FI NHÀ GA CẢNG
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tên Mạng Wi-Fi (SSID):</label>
            <input
              type="text"
              value={wifi.ssid || ''}
              onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu Wi-Fi:</label>
            <input
              type="text"
              value={wifi.password || ''}
              onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Emergency Alert Broadcast */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-sos" />
            <span>1.3 PHÁT BIỂU NGỮ CẢNH BÁO KHẨN CẤP</span>
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alertConfig.enabled || false}
              onChange={(e) => setAlertConfig({ ...alertConfig, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sos"></div>
            <span className="ml-2 text-xs font-bold text-slate-700">
              {alertConfig.enabled ? 'Đang bật' : 'Đang tắt'}
            </span>
          </label>
        </div>

        {alertConfig.enabled && (
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung Tiếng Việt (VI):</label>
              <textarea
                value={alertConfig.message?.vi || ''}
                onChange={(e) => setAlertConfig({
                  ...alertConfig,
                  message: { ...(alertConfig.message || {}), vi: e.target.value }
                })}
                rows="2"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung Tiếng Anh (EN):</label>
              <textarea
                value={alertConfig.message?.en || ''}
                onChange={(e) => setAlertConfig({
                  ...alertConfig,
                  message: { ...(alertConfig.message || {}), en: e.target.value }
                })}
                rows="2"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
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
          <span>{saved ? 'ĐÃ LƯU THÀNH CÔNG!' : 'LƯU THÔNG TIN CHUYẾN TÀU'}</span>
        </button>
      </div>
    </form>
  );
}
