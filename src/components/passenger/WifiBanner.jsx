import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { Wifi, Copy, Check } from 'lucide-react';

export default function WifiBanner() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const wifi = config.wifi || { ssid: "CRIP_FREE_WIFI", password: "WelcomeToCamRanh" };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(wifi.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-dark to-teal text-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md shrink-0">
          <Wifi className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-teal-100 block">
            Wi-Fi Nhà Ga Cảng Miễn Phí
          </span>
          <p className="text-sm font-black text-white">{wifi.ssid}</p>
          <p className="text-xs text-teal-100">
            Mật khẩu: <strong className="text-white font-mono">{wifi.password}</strong>
          </p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1 shrink-0 ${
          copied
            ? 'bg-navy text-white shadow'
            : 'bg-white hover:bg-slate-100 text-teal-dark shadow-sm active:scale-95'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-teal-light" />
            <span>Đã sao chép!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Chạm chép Pass</span>
          </>
        )}
      </button>
    </div>
  );
}
