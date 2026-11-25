import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { convertVnd, convertToVnd, formatVnd, formatForeign } from '../../utils/currency';
import { Calculator, ArrowRightLeft, DollarSign } from 'lucide-react';

export default function CurrencyCalc() {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();

  const [foreignAmount, setForeignAmount] = useState('100');
  const [targetCurrency, setTargetCurrency] = useState('USD'); // USD, CNY, KRW
  const [vndInput, setVndInput] = useState('');

  const rates = config.currencyRates || { USD: 25400, CNY: 3500, KRW: 18.2 };

  // Calculate conversion from foreign to VND
  const convertedVnd = convertToVnd(parseFloat(foreignAmount) || 0, rates, targetCurrency);

  // Quick VND button clicks
  const quickVndAmounts = [50000, 100000, 200000, 500000];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase text-navy tracking-wider flex items-center space-x-1.5">
          <Calculator className="w-4 h-4 text-teal" />
          <span>{t('currencyTitle', currentLang)}</span>
        </h2>
        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
          100% Offline
        </span>
      </div>

      {/* Currency Switcher Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {['USD', 'CNY', 'KRW'].map((curr) => {
          const active = targetCurrency === curr;
          return (
            <button
              key={curr}
              onClick={() => setTargetCurrency(curr)}
              className={`py-2 px-3 rounded-2xl font-black text-xs transition-all border ${
                active
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {curr} ({rates[curr] ? `${rates[curr].toLocaleString('vi-VN')} đ` : ''})
            </button>
          );
        })}
      </div>

      {/* Converter Input Box */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
            Số tiền Ngoại Tệ ({targetCurrency}):
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={foreignAmount}
              onChange={(e) => setForeignAmount(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-base font-black text-navy focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="Nhập số tiền..."
            />
            <span className="absolute right-3 top-2.5 text-xs font-black text-slate-400">
              {targetCurrency}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center my-1 text-teal">
          <ArrowRightLeft className="w-4 h-4" />
        </div>

        {/* Converted VND Result */}
        <div className="bg-white p-3 rounded-xl border border-teal/40 text-center">
          <span className="text-[11px] font-bold text-slate-500 block uppercase">
            Tương đương Việt Nam Đồng (VND):
          </span>
          <span className="text-xl sm:text-2xl font-black text-navy tracking-tight text-teal-dark block mt-0.5">
            {formatVnd(convertedVnd)}
          </span>
        </div>
      </div>
    </div>
  );
}
