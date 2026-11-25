import { defaultConfig } from '../data/defaultConfig';

const STORAGE_KEY = 'CRIP_CONFIG_V1';
const FEEDBACK_KEY = 'CRIP_FEEDBACK_V1';
const CUSTOM_EVENT_NAME = 'crip-config-changed';

/**
 * Get the current configuration from LocalStorage, falling back to defaultConfig
 */
export function getConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
      return defaultConfig;
    }
    const parsed = JSON.parse(raw);
    // Deep merge or fallback to ensure missing keys from schema updates are present
    return {
      ...defaultConfig,
      ...parsed,
      ship: { ...defaultConfig.ship, ...(parsed.ship || {}) },
      wifi: { ...defaultConfig.wifi, ...(parsed.wifi || {}) },
      emergencyAlert: { ...defaultConfig.emergencyAlert, ...(parsed.emergencyAlert || {}) },
      logistics: { ...defaultConfig.logistics, ...(parsed.logistics || {}) },
      currencyRates: { ...defaultConfig.currencyRates, ...(parsed.currencyRates || {}) },
      returnPortCard: { ...defaultConfig.returnPortCard, ...(parsed.returnPortCard || {}) },
      dictionary: { ...defaultConfig.dictionary, ...(parsed.dictionary || {}) }
    };
  } catch (err) {
    console.error('Failed to parse config from LocalStorage, resetting to default', err);
    return defaultConfig;
  }
}

/**
 * Save new configuration to LocalStorage and broadcast update
 */
export function saveConfig(newConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    // Trigger custom event for same-tab updates
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: newConfig }));
    return true;
  } catch (err) {
    console.error('Failed to save config to LocalStorage', err);
    return false;
  }
}

/**
 * Reset configuration to default seed
 */
export function resetConfig() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: defaultConfig }));
    return defaultConfig;
  } catch (err) {
    console.error('Failed to reset config', err);
    return defaultConfig;
  }
}

/**
 * Subscribe to config changes (both multi-tab storage event and single-tab CustomEvent)
 */
export function subscribeConfig(callback) {
  const handleStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(getConfig());
    }
  };

  const handleCustomEvent = (event) => {
    if (event.detail) {
      callback(event.detail);
    } else {
      callback(getConfig());
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);
  };
}

/**
 * Feedback operations
 */
export function getFeedbacks() {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to get feedbacks', err);
    return [];
  }
}

export function saveFeedback(item) {
  try {
    const feedbacks = getFeedbacks();
    const newRecord = {
      id: 'fb_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...item
    };
    feedbacks.unshift(newRecord);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbacks));
    return true;
  } catch (err) {
    console.error('Failed to save feedback', err);
    return false;
  }
}

/**
 * Export config as JSON string
 */
export function exportConfig() {
  const current = getConfig();
  return JSON.stringify(current, null, 2);
}

/**
 * Import config from JSON string
 */
export function importConfig(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    saveConfig(parsed);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
