import type { PortfolioData } from '../types/portfolio';

export const STORAGE_KEYS = {
  PORTFOLIO: 'globalfolio_portfolio_v1',
  DISPLAY_CURRENCY: 'globalfolio_display_currency_v1',
  THEME: 'globalfolio_theme_v1',
  EXCHANGE_RATE_OVERRIDES: 'globalfolio_exchange_rate_overrides_v1',
  EXCHANGE_RATES_CACHE: 'globalfolio_exchange_rates_cache_v1',
} as const;

export const API_URLS = {
  PRIMARY: 'https://open.er-api.com/v6/latest/USD',
  FALLBACK: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
} as const;

export const DEFAULT_PORTFOLIO: PortfolioData = {
  cash: { TWD: 0, JPY: 0, USD: 0 },
  stocks: { TW: 0, JP: 0, US: 0 },
  realEstate: { amount: 0, currency: 'TWD' },
  liabilities: { amount: 0, currency: 'TWD' },
};

export const CHART_COLORS = {
  // TWD (台幣) - Blue color family
  cashTWD: '#60a5fa',    // Light Blue (blue-400)
  stocksTW: '#2563eb',   // Dark Blue (blue-600)

  // JPY (日圓) - Orange color family
  cashJPY: '#fb923c',    // Light Orange (orange-400)
  stocksJP: '#ea580c',   // Dark Orange (orange-600)

  // USD (美元) - Green color family
  cashUSD: '#34d399',    // Light Green (emerald-400)
  stocksUS: '#059669',   // Dark Green (emerald-600)

  // Real Estate
  realEstate: '#ec4899', // Pink (pink-500)
} as const;

export const MARKET_CURRENCY_MAP = {
  TW: 'TWD',
  JP: 'JPY',
  US: 'USD',
} as const;
