/**
 * CRIP Smart Guide - Admin PIN Authentication & Session Utilities
 * - Salted SHA-256 hashing (Web Crypto API + pure-JS fallback for HTTP LAN / offline mobile)
 * - 8-hour persistent session in LocalStorage (bound to current pinHash so PIN changes revoke other devices)
 * - 5-attempt lockout for 30 seconds persisted in LocalStorage
 */

const PIN_SALT = 'CRIP_ADMIN_PIN_V1::';
const SESSION_KEY = 'CRIP_ADMIN_SESSION_V1';
const LOCKOUT_KEY = 'CRIP_ADMIN_LOCKOUT_V1';

export const DEFAULT_ADMIN_PIN_HASH =
  '447950ae60c62c60e0139896d79d13768545c3013723e56cbbea9bab1b2bab94';
export const DEFAULT_ADMIN_PIN_LENGTH = 6;
export const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 30 * 1000; // 30 seconds

/**
 * Pure-JS SHA-256 fallback for environments without crypto.subtle (e.g., plain HTTP LAN testing).
 */
function sha256Fallback(ascii) {
  const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = '';

  const words = [];
  const utf8Bytes = new TextEncoder().encode(ascii);
  const asciiBitLength = utf8Bytes.length * 8;

  const hash = [];
  const k = [];
  let primeCounter = 0;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  const padded = new Uint8Array(utf8Bytes.length + 1);
  padded.set(utf8Bytes);
  padded[utf8Bytes.length] = 0x80;

  const totalBytes = Math.ceil((padded.length + 8) / 64) * 64;
  const buffer = new Uint8Array(totalBytes);
  buffer.set(padded);

  for (let i = 0; i < buffer.length; i += 4) {
    words.push(
      ((buffer[i] << 24) |
        (buffer[i + 1] << 16) |
        (buffer[i + 2] << 8) |
        buffer[i + 3]) >>>
        0
    );
  }
  words[words.length - 2] = Math.floor(asciiBitLength / maxWord);
  words[words.length - 1] = asciiBitLength >>> 0;

  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0, 8);

    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];

      const a = hash[0];
      const e = hash[4];
      const temp1 =
        (hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0)) |
        0;

      const temp2 =
        ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]))) |
        0;

      hash.unshift((temp1 + temp2) | 0);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }

    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

/**
 * Hash a PIN with application salt using SHA-256.
 */
export async function hashAdminPin(pin) {
  const normalized = String(pin || '').trim();
  const payload = `${PIN_SALT}${normalized}`;

  if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined') {
    try {
      const data = new TextEncoder().encode(payload);
      const digest = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      // Fallback below
    }
  }

  return sha256Fallback(payload);
}

/**
 * Constant-time string comparison to avoid timing leaks.
 */
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function isValidPinFormat(pin) {
  return /^\d{4,8}$/.test(String(pin || '').trim());
}

export function getEffectivePinHash(config) {
  return config?.adminAuth?.pinHash || DEFAULT_ADMIN_PIN_HASH;
}

export function getEffectivePinLength(config) {
  const len = Number(config?.adminAuth?.pinLength);
  if (Number.isInteger(len) && len >= 4 && len <= 8) {
    return len;
  }
  return DEFAULT_ADMIN_PIN_LENGTH;
}

export async function verifyAdminPin(inputPin, expectedHash) {
  const target = expectedHash || DEFAULT_ADMIN_PIN_HASH;
  const candidateHash = await hashAdminPin(inputPin);
  return timingSafeEqual(candidateHash, target);
}

/**
 * 8-hour Admin Session Persistence (LocalStorage)
 */
export function getAdminSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveAdminSession(pinHash) {
  const now = Date.now();
  const session = {
    unlockedAt: now,
    expiresAt: now + ADMIN_SESSION_DURATION_MS,
    pinHash: pinHash || DEFAULT_ADMIN_PIN_HASH,
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota issues
  }
  return session;
}

export function clearAdminSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore
  }
}

export function isAdminSessionValid(expectedPinHash) {
  const session = getAdminSession();
  if (!session) return false;

  const targetHash = expectedPinHash || DEFAULT_ADMIN_PIN_HASH;
  const now = Date.now();
  const isUnexpired = typeof session.expiresAt === 'number' && now < session.expiresAt;
  const hashMatches = typeof session.pinHash === 'string' && timingSafeEqual(session.pinHash, targetHash);

  if (!isUnexpired || !hashMatches) {
    clearAdminSession();
    return false;
  }
  return true;
}

export function getSessionRemainingMs(expectedPinHash) {
  if (!isAdminSessionValid(expectedPinHash)) return 0;
  const session = getAdminSession();
  return Math.max(0, (session?.expiresAt || 0) - Date.now());
}

/**
 * Brute-force Lockout Tracking (5 wrong attempts -> 30s cooldown)
 */
export function getLockoutState() {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (!raw) return { failedAttempts: 0, lockUntil: 0, remainingSeconds: 0 };
    const parsed = JSON.parse(raw);
    const lockUntil = Number(parsed.lockUntil) || 0;
    const now = Date.now();

    if (lockUntil > now) {
      return {
        failedAttempts: Number(parsed.failedAttempts) || MAX_FAILED_ATTEMPTS,
        lockUntil,
        remainingSeconds: Math.ceil((lockUntil - now) / 1000),
      };
    }

    // Lock expired -> reset lockUntil and failedAttempts if it had reached max
    const failedAttempts =
      lockUntil > 0 ? 0 : Math.min(Number(parsed.failedAttempts) || 0, MAX_FAILED_ATTEMPTS - 1);

    if (lockUntil > 0) {
      localStorage.removeItem(LOCKOUT_KEY);
    }

    return { failedAttempts, lockUntil: 0, remainingSeconds: 0 };
  } catch {
    return { failedAttempts: 0, lockUntil: 0, remainingSeconds: 0 };
  }
}

export function recordFailedAttempt() {
  const current = getLockoutState();
  const nextAttempts = current.failedAttempts + 1;

  if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
    const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
    const state = { failedAttempts: nextAttempts, lockUntil };
    try {
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify(state));
    } catch {
      // Ignore
    }
    return {
      failedAttempts: nextAttempts,
      lockUntil,
      locked: true,
      remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      attemptsLeft: 0,
    };
  }

  const state = { failedAttempts: nextAttempts, lockUntil: 0 };
  try {
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(state));
  } catch {
    // Ignore
  }
  return {
    failedAttempts: nextAttempts,
    lockUntil: 0,
    locked: false,
    remainingSeconds: 0,
    attemptsLeft: MAX_FAILED_ATTEMPTS - nextAttempts,
  };
}

export function clearLockoutState() {
  try {
    localStorage.removeItem(LOCKOUT_KEY);
  } catch {
    // Ignore
  }
}
