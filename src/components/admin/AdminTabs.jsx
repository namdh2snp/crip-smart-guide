import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  Anchor,
  Bus,
  MapPin,
  Compass,
  MessageSquareQuote,
  ShieldAlert,
  BookA,
  Database
} from 'lucide-react';

export const ADMIN_TABS = [
  { id: 'ship', label: '1. Chuyến tàu & Wi-Fi', icon: Anchor },
  { id: 'logistics', label: '2. Phân luồng & Taxi', icon: Bus },
  { id: 'mappoi', label: '3. Sơ đồ & Điểm POI', icon: MapPin },
  { id: 'itinerary', label: '4. Lịch trình 4h/6h/8h', icon: Compass },
  { id: 'phrases', label: '5. Thẻ nói & Tỷ giá', icon: MessageSquareQuote },
  { id: 'emergency', label: '6. Danh bạ SOS', icon: ShieldAlert },
  { id: 'dictionary', label: '7. Từ điển đa ngữ', icon: BookA },
  { id: 'dataops', label: '8. Báo cáo, Phản hồi & Dữ liệu', icon: Database },
];

export default function AdminTabs({ activeTab, onSelectTab }) {
  const { config } = useConfig();
  const unreadSafetyCount = (config.safetyReports || []).filter((r) => r.status === 'new').length;

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
      {ADMIN_TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-black shrink-0 flex items-center space-x-2 transition-all ${
              active
                ? 'bg-navy text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${active ? 'text-teal' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            {tab.id === 'dataops' && unreadSafetyCount > 0 && (
              <span className="bg-sos text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none animate-pulse">
                {unreadSafetyCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
