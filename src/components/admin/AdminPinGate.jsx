import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Delete,
  ArrowLeft,
  AlertTriangle,
  Clock,
  RotateCcw,
} from 'lucide-react';
import {
  verifyAdminPin,
  saveAdminSession,
  getLockoutState,
  recordFailedAttempt,
  clearLockoutState,
  MAX_FAILED_ATTEMPTS,
} from '../../utils/adminAuth';

export default function AdminPinGate({ expectedPinHash, pinLength = 6, onUnlock }) {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shaking, setShaking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(() => getLockoutState().remainingSeconds);
  const verifyingRef = useRef(false);

  const isLocked = lockSeconds > 0;

  // Live countdown ticker when temporarily locked out
  useEffect(() => {
    if (lockSeconds <= 0) return;

    const timer = setInterval(() => {
      const state = getLockoutState();
      setLockSeconds(state.remainingSeconds);
      if (state.remainingSeconds <= 0) {
        setErrorMsg('');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lockSeconds]);

  const triggerShake = () => {
    setShaking(false);
    requestAnimationFrame(() => {
      setShaking(true);
      setTimeout(() => setShaking(false), 380);
    });
  };

  const submitPin = useCallback(
    async (candidatePin) => {
      if (verifyingRef.current) return;
      const lockState = getLockoutState();
      if (lockState.remainingSeconds > 0) {
        setLockSeconds(lockState.remainingSeconds);
        return;
      }

      verifyingRef.current = true;
      setVerifying(true);

      try {
        const isValid = await verifyAdminPin(candidatePin, expectedPinHash);
        if (isValid) {
          clearLockoutState();
          saveAdminSession(expectedPinHash);
          setErrorMsg('');
          setPin('');
          onUnlock();
          return;
        }

        const attemptResult = recordFailedAttempt();
        triggerShake();

        if (attemptResult.locked) {
          setLockSeconds(attemptResult.remainingSeconds);
          setErrorMsg(
            `Bạn đã nhập sai ${MAX_FAILED_ATTEMPTS} lần liên tiếp. Hệ thống tạm khóa trong ${attemptResult.remainingSeconds} giây.`
          );
        } else {
          setErrorMsg(
            `Mã PIN không chính xác. Còn ${attemptResult.attemptsLeft}/${MAX_FAILED_ATTEMPTS} lần thử.`
          );
        }

        setTimeout(() => {
          setPin('');
        }, 220);
      } finally {
        verifyingRef.current = false;
        setVerifying(false);
      }
    },
    [expectedPinHash, onUnlock]
  );

  const handleDigit = useCallback(
    (digit) => {
      if (isLocked || verifyingRef.current) return;
      setPin((prev) => {
        if (prev.length >= pinLength) return prev;
        const next = prev + digit;
        if (next.length === pinLength) {
          setTimeout(() => submitPin(next), 60);
        }
        return next;
      });
    },
    [isLocked, pinLength, submitPin]
  );

  const handleBackspace = useCallback(() => {
    if (isLocked || verifyingRef.current) return;
    setPin((prev) => prev.slice(0, -1));
  }, [isLocked]);

  const handleClear = useCallback(() => {
    if (isLocked || verifyingRef.current) return;
    setPin('');
    setErrorMsg('');
  }, [isLocked]);

  // Support physical keyboard input on desktop/laptop
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      } else if (e.key === 'Enter' && pin.length >= 4 && !isLocked) {
        e.preventDefault();
        submitPin(pin);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleDigit, handleBackspace, handleClear, submitPin, pin, isLocked]);

  const keypadDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy-dark to-navy flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-surface rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Top Brand Header */}
        <div className="bg-navy px-6 py-5 text-center border-b border-navy-light">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-teal/15 border border-teal/40 flex items-center justify-center mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-teal-light" />
          </div>
          <h1 className="text-base font-black text-white tracking-tight">
            XÁC THỰC QUẢN TRỊ VIÊN CRIP
          </h1>
          <p className="text-xs text-teal-light/90 font-medium mt-1">
            Cảng Quốc tế Cam Ranh • CMS Control Center
          </p>
        </div>

        {/* PIN Entry Body */}
        <div className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-navy flex items-center justify-center space-x-1.5">
              <Lock className="w-4 h-4 text-teal" />
              <span>Nhập mã PIN {pinLength} chữ số để mở khóa</span>
            </p>
            <p className="text-xs text-slate-500">
              Hỗ trợ bấm phím số trực tiếp hoặc bàn phím màn hình
            </p>
          </div>

          {/* PIN Dots Indicator */}
          <div
            className={`flex items-center justify-center gap-3 py-2 ${
              shaking ? 'animate-shake' : ''
            }`}
            aria-label={`Đã nhập ${pin.length} trên ${pinLength} chữ số`}
          >
            {Array.from({ length: pinLength }).map((_, idx) => {
              const filled = idx < pin.length;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                    isLocked
                      ? 'border-rose-300 bg-rose-100'
                      : filled
                      ? 'border-teal bg-teal scale-110 shadow-sm shadow-teal/40'
                      : 'border-slate-300 bg-white'
                  }`}
                />
              );
            })}
          </div>

          {/* Error or Lockout Banner */}
          {isLocked ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 flex items-start space-x-2.5 text-xs text-sos font-bold">
              <Clock className="w-4 h-4 shrink-0 mt-0.5 animate-pulse" />
              <span>
                Tạm khóa đăng nhập do nhập sai quá {MAX_FAILED_ATTEMPTS} lần. Vui lòng thử lại sau{' '}
                <strong className="font-mono text-sm">{lockSeconds}s</strong>.
              </span>
            </div>
          ) : errorMsg ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-2.5 flex items-center space-x-2 text-xs text-sos font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          ) : (
            <div className="text-center text-[11px] text-slate-400 font-medium h-5 flex items-center justify-center">
              Phiên đăng nhập sẽ tự động duy trì trong 8 giờ trên thiết bị này
            </div>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {keypadDigits.map((digit) => (
              <button
                key={digit}
                type="button"
                disabled={isLocked || verifying}
                onClick={() => handleDigit(digit)}
                className="h-14 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 shadow-sm text-xl font-black text-navy transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {digit}
              </button>
            ))}

            {/* Clear */}
            <button
              type="button"
              disabled={isLocked || verifying || pin.length === 0}
              onClick={handleClear}
              className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 text-xs font-extrabold text-slate-600 flex items-center justify-center space-x-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              title="Xóa hết"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Xóa</span>
            </button>

            {/* Zero */}
            <button
              type="button"
              disabled={isLocked || verifying}
              onClick={() => handleDigit('0')}
              className="h-14 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 shadow-sm text-xl font-black text-navy transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              0
            </button>

            {/* Backspace */}
            <button
              type="button"
              disabled={isLocked || verifying || pin.length === 0}
              onClick={handleBackspace}
              className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 text-slate-700 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Xóa 1 chữ số"
              title="Xóa 1 chữ số"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Back to Passenger App */}
          <div className="pt-2 border-t border-slate-200 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-navy px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-teal" />
              <span>Quay lại Giao diện Hành khách</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
