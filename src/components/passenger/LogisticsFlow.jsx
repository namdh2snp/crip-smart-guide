import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bus, Car, Clock, ShieldCheck, CheckCircle2, Phone, AlertCircle } from 'lucide-react';

export default function LogisticsFlow() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('independent'); // 'tour' or 'independent'

  const logistics = config.logistics || {};
  const tourBus = logistics.tourBusArea || {};
  const shuttle = logistics.shuttleBus || {};
  const taxiFares = config.taxiFares || [];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
      {/* 2 Flow Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 border border-slate-200">
        <button
          onClick={() => setActiveTab('independent')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'independent'
              ? 'bg-navy text-white shadow-md'
              : 'text-slate-600 hover:text-navy'
          }`}
        >
          <Car className="w-4 h-4 text-teal" />
          <span>{t('tabFree', currentLang)}</span>
        </button>

        <button
          onClick={() => setActiveTab('tour')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'tour'
              ? 'bg-navy text-white shadow-md'
              : 'text-slate-600 hover:text-navy'
          }`}
        >
          <Bus className="w-4 h-4 text-teal" />
          <span>{t('tabTour', currentLang)}</span>
        </button>
      </div>

      {/* CONTENT: INDEPENDENT TRAVEL (SHUTTLE + TAXI FARES) */}
      {activeTab === 'independent' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Free Shuttle Card */}
          <div className="bg-teal/10 border border-teal/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-navy text-sm flex items-center space-x-1.5">
                <Bus className="w-4 h-4 text-teal" />
                <span>{shuttle.title?.[currentLang] || shuttle.title?.en || shuttle.title?.vi}</span>
              </span>
              <span className="bg-teal text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                MIỄN PHÍ • FREE
              </span>
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <p className="flex items-center space-x-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-teal shrink-0" />
                <span>Tần suất: <strong>{shuttle.intervalMinutes || 15} phút/chuyến</strong> ({shuttle.operatingHours})</span>
              </p>
              <p className="text-slate-600">
                <strong>Lộ trình:</strong> {shuttle.route?.[currentLang] || shuttle.route?.en || shuttle.route?.vi}
              </p>
            </div>
          </div>

          {/* Official Listed Taxi Fare Table */}
          <div>
            <h3 className="font-extrabold text-navy text-xs uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Car className="w-4 h-4 text-teal" />
              <span>BẢNG GIÁ TAXI NIÊM YẾT CHÍNH HÃNG</span>
            </h3>

            <div className="space-y-3">
              {taxiFares.map((taxi) => {
                const noteText = taxi.note?.[currentLang] || taxi.note?.en || taxi.note?.vi;
                return (
                  <div key={taxi.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 hover:border-teal/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-navy">{taxi.company}</span>
                      <a
                        href={`tel:${taxi.hotline}`}
                        className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1"
                      >
                        <Phone className="w-3 h-3 text-teal" />
                        <span>{taxi.hotline}</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block text-[11px]">Trọn gói đi Nha Trang (~45km)</span>
                        <span className="font-extrabold text-navy text-sm text-teal-dark">{taxi.fixedNhaTrang}</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block text-[11px]">Trọn gói đi TP. Cam Ranh (~20km)</span>
                        <span className="font-extrabold text-navy text-sm text-teal-dark">{taxi.fixedCamRanhCity}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic bg-white/60 p-1.5 rounded-lg border border-slate-100">
                      ✓ {noteText}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: SHIP EXCURSION TOUR BUS AREA */}
      {activeTab === 'tour' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="bg-navy text-white rounded-2xl p-4">
            <h3 className="font-extrabold text-sm mb-2 text-teal-light flex items-center space-x-2">
              <Bus className="w-5 h-5 text-teal" />
              <span>{tourBus.title?.[currentLang] || tourBus.title?.en || tourBus.title?.vi}</span>
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              {tourBus.description?.[currentLang] || tourBus.description?.en || tourBus.description?.vi}
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-navy uppercase">LƯU Ý DÀNH CHO KHÁCH ĐOÀN:</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Mang theo thẻ bài lên tàu (SeaPass card) và hộ chiếu khi rời tàu.</li>
              <li>Tập trung tại Bãi đỗ xe số 1 & 2 trước giờ xuất phát 15 phút.</li>
              <li>Liên hệ trưởng đoàn hoặc đại lý cảng (+84 905 123 456) nếu bị lạc đoàn.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
