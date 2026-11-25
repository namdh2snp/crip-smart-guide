import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check, Plus, Trash2 } from 'lucide-react';

const clone = (val, fallback) => JSON.parse(JSON.stringify(val ?? fallback));

export default function Tab6Emergency() {
  const { config, updateConfig } = useConfig();
  const [returnCard, setReturnCard] = useState(() => clone(config.returnPortCard, {}));
  const [contacts, setContacts] = useState(() => clone(config.emergencyContacts, []));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setReturnCard(clone(config.returnPortCard, {}));
    setContacts(clone(config.emergencyContacts, []));
  }, [config]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateConfig({
      ...config,
      returnPortCard: returnCard,
      emergencyContacts: contacts
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* 1. Return Port Card Text */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          6.1 THÔNG TIN THẺ TOÀN MÀN HÌNH "ĐƯA TÔI VỀ CẢNG"
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dòng chữ lớn hiển thị cho tài xế:</label>
            <input
              type="text"
              value={returnCard.title || ''}
              onChange={(e) => setReturnCard({ ...returnCard, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-black text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tên Cảng Tiếng Anh:</label>
            <input
              type="text"
              value={returnCard.portNameEn || ''}
              onChange={(e) => setReturnCard({ ...returnCard, portNameEn: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ chi tiết của Cảng:</label>
            <input
              type="text"
              value={returnCard.address || ''}
              onChange={(e) => setReturnCard({ ...returnCard, address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-700 mb-1">Lời nhắc dành riêng cho lái xe taxi:</label>
            <input
              type="text"
              value={returnCard.driverNotice || ''}
              onChange={(e) => setReturnCard({ ...returnCard, driverNotice: e.target.value })}
              className="w-full bg-amber-50 border border-amber-300 rounded-xl px-3 py-2 text-xs font-semibold text-amber-900"
            />
          </div>
        </div>
      </div>

      {/* 2. Emergency Hotlines */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider">
            6.2 BẢNG HOTLINE KHẨN CẤP SOS 24/7
          </h3>
          <button
            type="button"
            onClick={() =>
              setContacts([
                ...contacts,
                {
                  id: 'sos_' + Date.now(),
                  role: {
                    vi: 'Đơn vị hỗ trợ khẩn cấp mới (24/7)',
                    en: 'New 24/7 Emergency Contact',
                    zh: '24小时紧急联系电话',
                    kr: '24시간 긴급 연락처'
                  },
                  phone: '+84 258 000 000'
                }
              ])
            }
            className="bg-teal hover:bg-teal-dark text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center space-x-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Hotline</span>
          </button>
        </div>

        <div className="space-y-3">
          {contacts.map((c, idx) => (
            <div key={c.id || idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 relative pr-10">
              {contacts.length > 1 && (
                <button
                  type="button"
                  onClick={() => setContacts(contacts.filter((_, i) => i !== idx))}
                  className="absolute top-2.5 right-2.5 text-rose-500 hover:text-rose-700 p-1"
                  title="Xóa số hotline này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div>
                <label className="block text-[11px] font-bold text-slate-600">Đơn vị / Bộ phận trực (VI):</label>
                <input
                  type="text"
                  value={c.role?.vi || ''}
                  onChange={(e) => {
                    const updated = [...contacts];
                    updated[idx] = {
                      ...updated[idx],
                      role: { ...(updated[idx].role || {}), vi: e.target.value }
                    };
                    setContacts(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-navy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">Số Điện Thoại:</label>
                <input
                  type="text"
                  value={c.phone || ''}
                  onChange={(e) => {
                    const updated = [...contacts];
                    updated[idx] = { ...updated[idx], phone: e.target.value };
                    setContacts(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-sos"
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
          <span>{saved ? 'ĐÃ LƯU THÀNH CÔNG!' : 'LƯU DANH BẠ SOS & HỒI CẢNG'}</span>
        </button>
      </div>
    </form>
  );
}
