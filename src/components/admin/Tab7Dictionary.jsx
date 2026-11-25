import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save, Check, Globe } from 'lucide-react';

export default function Tab7Dictionary() {
  const { config, updateConfig } = useConfig();
  const [dictionary, setDictionary] = useState({ ...(config.dictionary || {}) });
  const [selectedKey, setSelectedKey] = useState(Object.keys(config.dictionary || {})[0] || '');
  const [saved, setSaved] = useState(false);

  const keys = Object.keys(dictionary);

  const handleSave = (e) => {
    e.preventDefault();
    updateConfig({
      ...config,
      dictionary
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdate = (lang, value) => {
    setDictionary({
      ...dictionary,
      [selectedKey]: {
        ...dictionary[selectedKey],
        [lang]: value
      }
    });
  };

  const currentEntry = dictionary[selectedKey] || {};

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider flex items-center space-x-1.5">
            <Globe className="w-4 h-4 text-teal" />
            <span>7. TỪ ĐIỂN ĐA NGÔN NGỮ (VI / EN / ZH / KR)</span>
          </h3>
          <span className="text-xs text-slate-500 font-bold">{keys.length} Nhãn giao diện</span>
        </div>

        {/* Key selector dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Chọn Nhãn Giao Diện Cần Biên Tập:</label>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-navy"
          >
            {keys.map((k) => (
              <option key={k} value={k}>
                {k} (VI: {dictionary[k]?.vi || ''})
              </option>
            ))}
          </select>
        </div>

        {/* 4 Translation Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">🇻🇳 Tiếng Việt (VI):</label>
            <input
              type="text"
              value={currentEntry.vi || ''}
              onChange={(e) => handleUpdate('vi', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">🇬🇧 English (EN):</label>
            <input
              type="text"
              value={currentEntry.en || ''}
              onChange={(e) => handleUpdate('en', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">🇨🇳 中文 (ZH):</label>
            <input
              type="text"
              value={currentEntry.zh || ''}
              onChange={(e) => handleUpdate('zh', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">🇰🇷 한국어 (KR):</label>
            <input
              type="text"
              value={currentEntry.kr || ''}
              onChange={(e) => handleUpdate('kr', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-navy"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-navy hover:bg-navy-light text-white font-black py-3 px-6 rounded-2xl text-xs uppercase shadow-lg flex items-center space-x-2 transition-all"
        >
          {saved ? <Check className="w-4 h-4 text-teal" /> : <Save className="w-4 h-4 text-teal" />}
          <span>{saved ? 'ĐÃ LƯU TỪ ĐIỂN!' : 'LƯU BẢN DỊCH TỪ ĐIỂN'}</span>
        </button>
      </div>
    </form>
  );
}
