import { createClient } from '@supabase/supabase-js';
import { defaultConfig } from '../data/defaultConfig';
import initialCripConfig from '../../crip-config.json';

const STORAGE_KEY = 'CRIP_CONFIG_V1';
const FEEDBACK_KEY = 'CRIP_FEEDBACK_V1';
const CUSTOM_EVENT_NAME = 'crip-config-changed';

const SUPABASE_PROJECT_REF = 'voefyivupyxwdnzcertw';
const RAW_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || SUPABASE_PROJECT_REF;
export const SUPABASE_URL = RAW_SUPABASE_URL.startsWith('http')
  ? RAW_SUPABASE_URL
  : `https://${RAW_SUPABASE_URL}.supabase.co`;

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZWZ5aXZ1cHl4d2RuemNlcnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU1MzY2NDMsImV4cCI6MjExMTExMjY0M30.wmKxJLPE8nn_jhvzeaW7gkJfzA0R-nEe_hnuWkxKVXU';

const APP_CONFIG_TABLE = 'app_config';
const APP_CONFIG_ROW_ID = 1;
const CANDIDATE_JSON_COLUMNS = ['data', 'config', 'content', 'payload', 'value'];

let activeConfigColumn = 'data';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

/**
 * Merge a partial config object with defaultConfig so schema keys are always complete.
 */
export function mergeWithDefault(parsed) {
  if (!parsed || typeof parsed !== 'object') {
    return defaultConfig;
  }
  return {
    ...defaultConfig,
    ...parsed,
    ship: {
      ...defaultConfig.ship,
      ...(parsed.ship || {}),
      weather: {
        ...(defaultConfig.ship?.weather || {}),
        ...(parsed.ship?.weather || {}),
      },
    },
    wifi: { ...defaultConfig.wifi, ...(parsed.wifi || {}) },
    emergencyAlert: {
      ...defaultConfig.emergencyAlert,
      ...(parsed.emergencyAlert || {}),
      message: {
        ...(defaultConfig.emergencyAlert?.message || {}),
        ...(parsed.emergencyAlert?.message || {}),
      },
    },
    logistics: {
      ...defaultConfig.logistics,
      ...(parsed.logistics || {}),
      tourBusArea: {
        ...(defaultConfig.logistics?.tourBusArea || {}),
        ...(parsed.logistics?.tourBusArea || {}),
      },
      shuttleBus: {
        ...(defaultConfig.logistics?.shuttleBus || {}),
        ...(parsed.logistics?.shuttleBus || {}),
      },
    },
    currencyRates: { ...defaultConfig.currencyRates, ...(parsed.currencyRates || {}) },
    returnPortCard: { ...defaultConfig.returnPortCard, ...(parsed.returnPortCard || {}) },
    adminAuth: {
      ...defaultConfig.adminAuth,
      ...(parsed.adminAuth || {}),
    },
    safetyReports: Array.isArray(parsed.safetyReports) ? parsed.safetyReports : [],
    feedbacks: Array.isArray(parsed.feedbacks) ? parsed.feedbacks : [],
    dictionary: { ...defaultConfig.dictionary, ...(parsed.dictionary || {}) },
  };
}

/**
 * Initial seed config built from crip-config.json merged with defaultConfig.js
 */
export function getInitialSeedConfig() {
  return mergeWithDefault(initialCripConfig);
}

/**
 * Extract the JSON config object from a Supabase app_config row
 * (supports flexible jsonb column names: data, config, content, payload, value).
 */
function extractConfigFromRow(row) {
  if (!row || typeof row !== 'object') return null;

  for (const col of CANDIDATE_JSON_COLUMNS) {
    const val = row[col];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      activeConfigColumn = col;
      return val;
    }
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (parsed && typeof parsed === 'object') {
          activeConfigColumn = col;
          return parsed;
        }
      } catch {
        // ignore non-JSON string
      }
    }
  }

  // Fallback: scan any other object column that looks like CRIP config
  for (const [key, val] of Object.entries(row)) {
    if (key === 'id' || key === 'created_at' || key === 'updated_at') continue;
    if (val && typeof val === 'object' && !Array.isArray(val) && (val.ship || val.dictionary || val.mapPois)) {
      activeConfigColumn = key;
      return val;
    }
  }

  return null;
}

/**
 * Upsert config object to app_config (id = 1) with automatic column-name detection
 */
async function upsertConfigToSupabase(configObj) {
  const columnsToTry = [
    activeConfigColumn,
    ...CANDIDATE_JSON_COLUMNS.filter((c) => c !== activeConfigColumn),
  ];

  let lastError = null;

  for (const col of columnsToTry) {
    const payload = {
      id: APP_CONFIG_ROW_ID,
      [col]: configObj,
    };

    const { error } = await supabase
      .from(APP_CONFIG_TABLE)
      .upsert(payload, { onConflict: 'id' });

    if (!error) {
      activeConfigColumn = col;
      return { ok: true, column: col };
    }

    lastError = error;

    // PGRST204 / 42703 means column doesn't exist -> try next candidate column
    const isMissingColumn =
      error.code === 'PGRST204' ||
      error.code === '42703' ||
      (typeof error.message === 'string' && error.message.toLowerCase().includes('column'));

    if (!isMissingColumn) {
      break;
    }
  }

  console.error('[CRIP Supabase] Failed to save app_config:', lastError);
  return { ok: false, error: lastError };
}

/**
 * Write config to LocalStorage cache and dispatch same-tab event
 */
function persistLocalCache(configObj, broadcast = true) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configObj));
    if (broadcast) {
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: configObj }));
    }
    return true;
  } catch (err) {
    // Handle LocalStorage quota exceeded by stripping heavy photo blobs from local cache only
    try {
      const lite = {
        ...configObj,
        safetyReports: (configObj.safetyReports || []).map((r) => ({ ...r, photoDataUrl: null })),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lite));
      if (broadcast) {
        window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: configObj }));
      }
      return true;
    } catch (innerErr) {
      console.error('Failed to save config to LocalStorage cache', innerErr);
      return false;
    }
  }
}

/**
 * Synchronous read from LocalStorage cache (instant initial render & offline PWA fallback).
 * Falls back to crip-config.json merged with defaultConfig.js.
 */
export function getConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getInitialSeedConfig();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    return mergeWithDefault(parsed);
  } catch (err) {
    console.error('Failed to parse config from LocalStorage, using seed config', err);
    return getInitialSeedConfig();
  }
}

/**
 * Load config from Supabase app_config (id = 1).
 * If table / row id = 1 is empty, automatically seeds it from crip-config.json + defaultConfig.js.
 */
export async function fetchConfigFromSupabase() {
  try {
    const { data, error } = await supabase
      .from(APP_CONFIG_TABLE)
      .select('*')
      .eq('id', APP_CONFIG_ROW_ID)
      .maybeSingle();

    if (error) {
      console.error('[CRIP Supabase] Error fetching app_config:', error);
      return {
        ok: false,
        config: getConfig(),
        error: error.message || 'Không thể đọc bảng app_config từ Supabase',
        code: error.code,
      };
    }

    const remoteConfig = extractConfigFromRow(data);

    // If row id = 1 does not exist or its config column is empty -> seed automatically
    if (!data || !remoteConfig) {
      const seed = getInitialSeedConfig();
      const seedResult = await upsertConfigToSupabase(seed);
      persistLocalCache(seed, true);
      return {
        ok: seedResult.ok,
        seeded: seedResult.ok,
        config: seed,
        error: seedResult.ok ? null : seedResult.error?.message,
        code: seedResult.ok ? null : seedResult.error?.code,
      };
    }

    const merged = mergeWithDefault(remoteConfig);
    persistLocalCache(merged, true);
    return {
      ok: true,
      seeded: false,
      config: merged,
      error: null,
    };
  } catch (err) {
    console.error('[CRIP Supabase] Network/unexpected error fetching app_config:', err);
    return {
      ok: false,
      config: getConfig(),
      error: err.message || 'Mất kết nối tới Supabase (đang dùng dữ liệu ngoại tuyến)',
      offline: true,
    };
  }
}

/**
 * Save new configuration:
 * 1) Updates LocalStorage cache & broadcasts locally immediately (optimistic + offline support)
 * 2) Upserts directly to Supabase app_config (id = 1) so all connected devices receive Realtime updates
 */
export async function saveConfig(newConfig) {
  const merged = mergeWithDefault(newConfig);
  persistLocalCache(merged, true);

  const remoteResult = await upsertConfigToSupabase(merged);
  return {
    ok: remoteResult.ok,
    config: merged,
    error: remoteResult.ok ? null : remoteResult.error?.message,
    code: remoteResult.ok ? null : remoteResult.error?.code,
  };
}

/**
 * Reset configuration to default seed (defaultConfig.js) and sync to Supabase app_config (id = 1)
 */
export async function resetConfig() {
  const current = getConfig();
  const freshDefault = mergeWithDefault({
    ...defaultConfig,
    adminAuth: current?.adminAuth || defaultConfig.adminAuth,
  });
  persistLocalCache(freshDefault, true);
  await upsertConfigToSupabase(freshDefault);
  return freshDefault;
}

/**
 * Subscribe to config changes from:
 * 1) Supabase Realtime (postgres_changes on public.app_config where id = 1) — cross-device instant sync
 * 2) Browser storage event (multi-tab same device)
 * 3) CustomEvent (same-tab updates)
 */
export function subscribeConfig(callback, onStatusChange) {
  const handleStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(getConfig());
    }
  };

  const handleCustomEvent = (event) => {
    if (event.detail) {
      callback(mergeWithDefault(event.detail));
    } else {
      callback(getConfig());
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);

  const channel = supabase
    .channel(`crip-app-config-realtime-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: APP_CONFIG_TABLE,
        filter: `id=eq.${APP_CONFIG_ROW_ID}`,
      },
      (payload) => {
        const nextRow = payload.new;
        const extracted = extractConfigFromRow(nextRow);
        if (extracted) {
          const merged = mergeWithDefault(extracted);
          // Update local cache silently and notify subscribers
          persistLocalCache(merged, false);
          callback(merged);
        }
      }
    )
    .subscribe((status) => {
      if (typeof onStatusChange === 'function') {
        onStatusChange(status);
      }
    });

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);
    supabase.removeChannel(channel);
  };
}

/**
 * Safety Incident Report operations (Photo + GPS) synced with Supabase app_config (id = 1)
 */
const MAX_SAFETY_REPORTS = 30;

export async function submitSafetyReport(reportInput) {
  const newReport = {
    id: 'sr_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    status: 'new', // new | processing | resolved
    ...reportInput,
  };

  // Read latest remote config first so we don't overwrite concurrent admin updates
  let baseConfig = getConfig();
  try {
    const { data, error } = await supabase
      .from(APP_CONFIG_TABLE)
      .select('*')
      .eq('id', APP_CONFIG_ROW_ID)
      .maybeSingle();
    if (!error && data) {
      const extracted = extractConfigFromRow(data);
      if (extracted) {
        baseConfig = mergeWithDefault(extracted);
      }
    }
  } catch {
    // Offline fallback uses local cache
  }

  const nextReports = [newReport, ...(baseConfig.safetyReports || [])].slice(0, MAX_SAFETY_REPORTS);
  const saveRes = await saveConfig({
    ...baseConfig,
    safetyReports: nextReports,
  });

  return {
    ok: true,
    remoteSynced: saveRes.ok,
    report: newReport,
    error: saveRes.error,
  };
}

export async function updateSafetyReportStatus(reportId, status) {
  const current = getConfig();
  const updatedReports = (current.safetyReports || []).map((item) =>
    item.id === reportId ? { ...item, status } : item
  );
  return saveConfig({
    ...current,
    safetyReports: updatedReports,
  });
}

export async function deleteSafetyReport(reportId) {
  const current = getConfig();
  const updatedReports = (current.safetyReports || []).filter((item) => item.id !== reportId);
  return saveConfig({
    ...current,
    safetyReports: updatedReports,
  });
}

/**
 * Feedback operations synced with Supabase app_config (id = 1) + LocalStorage offline fallback
 */
const MAX_FEEDBACKS = 100;

export function getFeedbacks() {
  try {
    const configFeedbacks = getConfig().feedbacks || [];
    const rawLegacy = localStorage.getItem(FEEDBACK_KEY);
    const legacy = rawLegacy ? JSON.parse(rawLegacy) : [];
    const seen = new Set(configFeedbacks.map((f) => f.id));
    const merged = [...configFeedbacks, ...legacy.filter((f) => !seen.has(f.id))];
    return merged;
  } catch (err) {
    console.error('Failed to get feedbacks', err);
    return [];
  }
}

export async function saveFeedback(item) {
  const newRecord = {
    id: 'fb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    ...item,
  };

  // Always keep a local copy immediately
  try {
    const rawLegacy = localStorage.getItem(FEEDBACK_KEY);
    const legacy = rawLegacy ? JSON.parse(rawLegacy) : [];
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([newRecord, ...legacy].slice(0, MAX_FEEDBACKS)));
  } catch {
    // ignore local quota error
  }

  // Fetch latest remote config before appending to avoid overwriting concurrent updates
  let baseConfig = getConfig();
  try {
    const { data, error } = await supabase
      .from(APP_CONFIG_TABLE)
      .select('*')
      .eq('id', APP_CONFIG_ROW_ID)
      .maybeSingle();
    if (!error && data) {
      const extracted = extractConfigFromRow(data);
      if (extracted) {
        baseConfig = mergeWithDefault(extracted);
      }
    }
  } catch {
    // Offline fallback uses local cache
  }

  const nextFeedbacks = [newRecord, ...(baseConfig.feedbacks || [])].slice(0, MAX_FEEDBACKS);
  const saveRes = await saveConfig({
    ...baseConfig,
    feedbacks: nextFeedbacks,
  });

  return { ok: true, remoteSynced: saveRes.ok, feedback: newRecord };
}

/**
 * Export config as JSON string
 */
export function exportConfig() {
  const current = getConfig();
  return JSON.stringify(current, null, 2);
}

/**
 * Import config from JSON string and push to Supabase
 */
export async function importConfig(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    const current = getConfig();
    const nextConfig = {
      ...parsed,
      adminAuth: parsed.adminAuth?.pinHash
        ? parsed.adminAuth
        : current?.adminAuth || defaultConfig.adminAuth,
    };
    const res = await saveConfig(nextConfig);
    return { success: true, remoteSynced: res.ok, error: res.error };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
