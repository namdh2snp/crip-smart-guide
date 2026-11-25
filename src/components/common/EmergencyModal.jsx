import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Phone, MapPin, AlertTriangle, ShieldCheck, Car } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose }) {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();

  if (!isOpen) return null;

  const card = config.returnPortCard || {};
  const contacts = config.emergencyContacts || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border-4 border-sos flex flex-col">
        {/* Header */}
        <div className="bg-sos text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <h2 className="text-lg font-black tracking-wide uppercase">
              {t('sosButton', currentLang)} & HỒI CẢNG
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4 space-y-5">
          {/* GIANT DRIVER CARD FOR TAXI */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4 shadow-inner text-center">
            <span className="inline-block bg-yellow-400 text-yellow-950 text-xs font-black uppercase px-2.5 py-1 rounded-md mb-2">
              ĐƯA CHO BÁC TÀI XẾ XEM / SHOW TO TAXI DRIVER
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-navy leading-tight mb-3">
              {card.title || "LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH"}
            </h3>

            <div className="bg-white p-3 rounded-xl border border-yellow-200 text-left space-y-2 mb-3">
              <div className="flex items-start space-x-2 text-slate-800">
                <MapPin className="w-5 h-5 text-sos shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-navy">{card.portNameEn}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{card.address}</p>
                </div>
              </div>

              {card.driverNotice && (
                <div className="flex items-start space-x-2 text-amber-800 bg-amber-50 p-2 rounded-lg text-xs">
                  <Car className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <p className="font-semibold">{card.driverNotice}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {card.contactPhone && (
                <a
                  href={`tel:${card.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 bg-navy hover:bg-navy-dark text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
                >
                  <Phone className="w-4 h-4 text-teal" />
                  <span>Gọi Điều Hành Cảng</span>
                </a>
              )}
              {card.securityPhone && (
                <a
                  href={`tel:${card.securityPhone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 bg-sos hover:bg-sos-dark text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Gọi Trực Ban An Ninh</span>
                </a>
              )}
            </div>
          </div>

          {/* EMERGENCY CONTACTS LIST */}
          <div>
            <h4 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Phone className="w-4 h-4 text-sos" />
              <span>DANH BẠ KHẨN CẤP / EMERGENCY HOTLINES</span>
            </h4>
            <div className="space-y-2">
              {contacts.map((contact, idx) => {
                const roleText = contact.role[currentLang] || contact.role['en'] || contact.role['vi'];
                return (
                  <div
                    key={contact.id || idx}
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
                  >
                    <div className="pr-2">
                      <p className="font-bold text-xs text-navy leading-tight">{roleText}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{contact.phone}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="bg-sos text-white font-black text-xs px-3 py-2 rounded-xl flex items-center space-x-1 hover:bg-sos-dark active:scale-95 shadow transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>GỌI NGAY</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase"
          >
            Đóng cửa sổ này
          </button>
        </div>
      </div>
    </div>
  );
}
