import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { Anchor, Clock, Bell, BellRing, Sun, Cloud, AlertCircle, Compass } from 'lucide-react';

export default function ShipStatusCard() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, expired: false });
  const [reminded, setReminded] = useState(() => {
    return localStorage.getItem('CRIP_REMINDER_60') === 'true';
  });

  const ship = config.ship || {};
  const alertMsg = config.emergencyAlert?.enabled
    ? (config.emergencyAlert.message[currentLang] || config.emergencyAlert.message['en'] || config.emergencyAlert.message['vi'])
    : null;

  // Calculate countdown to All Aboard
  useEffect(() => {
    function calculate() {
      if (!ship.allAboardTime) return;

      const now = new Date();
      const [allHours, allMins] = ship.allAboardTime.split(':').map(Number);

      const target = new Date();
      target.setHours(allHours, allMins, 0, 0);

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, expired: true });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, expired: false });
      }
    }

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [ship.allAboardTime]);

  const toggleReminder = () => {
    const nextState = !reminded;
    setReminded(nextState);
    localStorage.setItem('CRIP_REMINDER_60', String(nextState));
    if (nextState) {
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
  };

  const weatherCond = typeof ship.weather?.condition === 'object'
    ? (ship.weather.condition[currentLang] || ship.weather.condition['en'] || ship.weather.condition['vi'])
    : ship.weather?.condition;

  return (
    <div className="space-y-3">
      {/* Emergency Notice Broadcast (if enabled in Admin) */}
      {alertMsg && (
        <div className="bg-sos text-white p-3.5 rounded-2xl shadow-lg flex items-start space-x-2.5 animate-pulse">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-xs font-bold leading-relaxed">{alertMsg}</p>
        </div>
      )}

      {/* Main Ship Card */}
      <div className="bg-gradient-to-br from-navy via-navy-dark to-slate-900 text-white rounded-3xl p-5 shadow-xl border border-navy-light/40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-teal/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top bar: Ship Name & Weather */}
        <div className="flex items-start justify-between border-b border-navy-light/50 pb-3 mb-4">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5 text-teal text-xs font-black uppercase tracking-wider">
              <Anchor className="w-3.5 h-3.5" />
              <span>{t('shipStatusTitle', currentLang)}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {ship.name}
            </h1>
            <p className="text-xs text-slate-300 font-medium flex items-center space-x-1">
              <Compass className="w-3 h-3 text-teal" />
              <span>{ship.berth}</span>
            </p>
          </div>

          {/* Weather Tag */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-1.5 text-right border border-white/10 shrink-0">
            <div className="flex items-center space-x-1 justify-end text-amber-300 font-black text-sm">
              <Sun className="w-4 h-4 animate-spin-slow" />
              <span>{ship.weather?.temp || '29°C'}</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium truncate max-w-[110px]">
              {weatherCond}
            </p>
          </div>
        </div>

        {/* ALL ABOARD COUNTDOWN */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase text-amber-300 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('allAboard', currentLang)}: <strong className="text-white text-sm">{ship.allAboardTime}</strong></span>
            </span>

            {/* 60m reminder button */}
            <button
              onClick={toggleReminder}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 transition-all ${
                reminded
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-white/20 text-slate-200 hover:bg-white/30'
              }`}
            >
              {reminded ? <BellRing className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
              <span>{reminded ? t('remindedText', currentLang) : t('remind60Min', currentLang)}</span>
            </button>
          </div>

          {/* Countdown Clock Digit Boxes */}
          {timeLeft.expired ? (
            <div className="bg-sos/90 text-white text-center py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm animate-bounce">
              ⚠️ ĐÃ HẾT GIỜ TẬP TRUNG (ALL ABOARD TIME PASSED) - VUI LÒNG GỌI NGAY SOS!
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-navy-dark/80 rounded-xl py-2 px-1 border border-navy-light">
                <span className="block text-2xl font-black text-teal font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-400 font-bold">
                  {t('countdownHours', currentLang)}
                </span>
              </div>
              <div className="bg-navy-dark/80 rounded-xl py-2 px-1 border border-navy-light">
                <span className="block text-2xl font-black text-teal font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-400 font-bold">
                  {t('countdownMins', currentLang)}
                </span>
              </div>
              <div className="bg-navy-dark/80 rounded-xl py-2 px-1 border border-navy-light">
                <span className="block text-2xl font-black text-amber-300 font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-400 font-bold">
                  {t('countdownSecs', currentLang)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
