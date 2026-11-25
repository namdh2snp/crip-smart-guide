import React, { createContext, useContext, useState, useEffect } from 'react';
import { getConfig, saveConfig, resetConfig, subscribeConfig } from '../utils/storage';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(() => getConfig());

  useEffect(() => {
    const unsubscribe = subscribeConfig((newConfig) => {
      setConfig(newConfig);
    });
    return unsubscribe;
  }, []);

  const updateConfig = (newConfig) => {
    saveConfig(newConfig);
    setConfig(newConfig);
  };

  const handleReset = () => {
    const res = resetConfig();
    setConfig(res);
  };

  // Helper to translate key from dictionary or fallback to English/Vietnamese
  const t = (key, lang = 'vi') => {
    if (config.dictionary && config.dictionary[key]) {
      const dictEntry = config.dictionary[key];
      return dictEntry[lang] || dictEntry['en'] || dictEntry['vi'] || key;
    }
    return key;
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig: handleReset, t }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
