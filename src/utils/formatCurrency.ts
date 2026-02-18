import type { Currency } from '../types/currency';

const CURRENCY_CONFIG: Record<Currency, { locale: string; minimumFractionDigits: number; maximumFractionDigits: number }> = {
  TWD: { locale: 'zh-TW', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  JPY: { locale: 'ja-JP', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  USD: { locale: 'en-US', minimumFractionDigits: 2, maximumFractionDigits: 2 },
};

export function formatCurrency(amount: number, currency: Currency): string {
  const config = CURRENCY_CONFIG[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits,
  }).format(amount);
}

export function formatNumber(amount: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
