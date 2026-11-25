import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getConfig,
  fetchConfigFromSupabase,
  saveConfig,
  resetConfig,
  subscribeConfig,
} from '../utils/storage';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(() => getConfig());
  const [syncStatus, setSyncStatus] = useState('connecting'); // connecting | synced | offline | error
  const [realtimeStatus, setRealtimeStatus] = useState('CONNECTING');
  const [syncError, setSyncError] = useState(null);

  useEffect(() => {
    let active = true;

    // 1. Fetch latest config from Supabase app_config (id = 1) or auto-seed if empty
    fetchConfigFromSupabase().then((res) => {
      if (!active) return;
      if (res.config) {
        setConfig(res.config);
      }
      if (res.ok) {
        setSyncStatus('synced');
        setSyncError(null);
      } else if (res.offline) {
        setSyncStatus('offline');
        setSyncError(res.error);
      } else {
        setSyncStatus('error');
        setSyncError(res.error);
      }
    });

    // 2. Subscribe to Supabase Realtime + browser storage + CustomEvent
    const unsubscribe = subscribeConfig(
      (newConfig) => {
        if (!active) return;
        setConfig(newConfig);
      },
      (rtStatus) => {
        if (!active) return;
        setRealtimeStatus(rtStatus);
      }
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const updateConfig = useCallback(async (newConfig) => {
    setConfig(newConfig);
    const res = await saveConfig(newConfig);
    if (res.ok) {
      setSyncStatus('synced');
      setSyncError(null);
    } else {
      setSyncStatus('error');
      setSyncError(res.error);
    }
    return res;
  }, []);

  const handleReset = useCallback(async () => {
    const res = await resetConfig();
    setConfig(res);
    return res;
  }, []);

  // Helper to translate key from dictionary or fallback to English/Vietnamese
  const t = useCallback(
    (key, lang = 'vi') => {
      if (config.dictionary && config.dictionary[key]) {
        const dictEntry = config.dictionary[key];
        return dictEntry[lang] || dictEntry['en'] || dictEntry['vi'] || key;
      }
      return key;
    },
    [config.dictionary]
  );

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig: handleReset,
        t,
        syncStatus,
        realtimeStatus,
        syncError,
      }}
    >
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
