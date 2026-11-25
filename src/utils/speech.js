/**
 * Web Speech API Utility for Vietnamese Audio Pronunciation
 */

export function speakVietnamese(text, onEnd) {
  if (!('speechSynthesis' in window)) {
    alert('Trình duyệt của bạn không hỗ trợ Web Speech API.');
    if (onEnd) onEnd();
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.85; // slightly slower for clear tourist comprehension
  utterance.pitch = 1.0;

  // Try to find a Vietnamese voice if available
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang.startsWith('vi') || v.lang.includes('vi-VN'));
  if (viVoice) {
    utterance.voice = viVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}
