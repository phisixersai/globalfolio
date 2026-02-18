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
  cashTWD: '#3b82f6',   // Blue
  cashJPY: '#8b5cf6',   // Purple
  cashUSD: '#06b6d4',   // Cyan
  stocksTW: '#10b981',  // Green
  stocksJP: '#f59e0b',  // Orange
  stocksUS: '#ef4444',  // Red
  realEstate: '#ec4899', // Pink
} as const;

export const MARKET_CURRENCY_MAP = {
  TW: 'TWD',
  JP: 'JPY',
  US: 'USD',
} as const;
