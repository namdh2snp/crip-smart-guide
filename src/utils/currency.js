/**
 * Currency Conversion Helper (Offline)
 */

export function convertVnd(amountVnd, currencyRates, targetCurrency) {
  const rate = currencyRates[targetCurrency];
  if (!rate || rate <= 0) return 0;
  return amountVnd / rate;
}

export function convertToVnd(foreignAmount, currencyRates, targetCurrency) {
  const rate = currencyRates[targetCurrency];
  if (!rate || rate <= 0) return 0;
  return foreignAmount * rate;
}

export function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value || 0);
}

export function formatForeign(value, currency) {
  const digits = currency === 'KRW' ? 0 : 2;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value || 0);
}
