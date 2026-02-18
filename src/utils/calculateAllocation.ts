import type { Currency, ExchangeRates } from '../types/currency';
import type { PortfolioData, AllocationSlice } from '../types/portfolio';
import { convert } from '../services/currencyConverter';
import { CHART_COLORS, MARKET_CURRENCY_MAP } from './constants';

export function calculateAllocation(
  portfolio: PortfolioData,
  rates: ExchangeRates,
  displayCurrency: Currency
): AllocationSlice[] {
  const slices: AllocationSlice[] = [];

  // Cash items
  const cashEntries: { key: string; label: string; currency: Currency; amount: number; color: string }[] = [
    { key: 'cashTWD', label: 'cash.TWD', currency: 'TWD', amount: portfolio.cash.TWD, color: CHART_COLORS.cashTWD },
    { key: 'cashJPY', label: 'cash.JPY', currency: 'JPY', amount: portfolio.cash.JPY, color: CHART_COLORS.cashJPY },
    { key: 'cashUSD', label: 'cash.USD', currency: 'USD', amount: portfolio.cash.USD, color: CHART_COLORS.cashUSD },
  ];

  for (const entry of cashEntries) {
    const value = convert(entry.amount, entry.currency, displayCurrency, rates);
    if (value > 0) {
      slices.push({
        category: 'cash',
        label: entry.label,
        valueInDisplayCurrency: value,
        percentage: 0,
        color: entry.color,
      });
    }
  }

  // Stock items
  const stockEntries: { key: string; label: string; market: keyof typeof MARKET_CURRENCY_MAP; amount: number; color: string }[] = [
    { key: 'stocksTW', label: 'stocks.TW', market: 'TW', amount: portfolio.stocks.TW, color: CHART_COLORS.stocksTW },
    { key: 'stocksJP', label: 'stocks.JP', market: 'JP', amount: portfolio.stocks.JP, color: CHART_COLORS.stocksJP },
    { key: 'stocksUS', label: 'stocks.US', market: 'US', amount: portfolio.stocks.US, color: CHART_COLORS.stocksUS },
  ];

  for (const entry of stockEntries) {
    const currency = MARKET_CURRENCY_MAP[entry.market] as Currency;
    const value = convert(entry.amount, currency, displayCurrency, rates);
    if (value > 0) {
      slices.push({
        category: 'stocks',
        label: entry.label,
        valueInDisplayCurrency: value,
        percentage: 0,
        color: entry.color,
      });
    }
  }

  // Real estate
  const realEstateValue = convert(
    portfolio.realEstate.amount,
    portfolio.realEstate.currency,
    displayCurrency,
    rates
  );
  if (realEstateValue > 0) {
    slices.push({
      category: 'realEstate',
      label: 'realEstate',
      valueInDisplayCurrency: realEstateValue,
      percentage: 0,
      color: CHART_COLORS.realEstate,
    });
  }

  // Calculate percentages
  const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
  if (total > 0) {
    for (const slice of slices) {
      slice.percentage = (slice.valueInDisplayCurrency / total) * 100;
    }
  }

  return slices;
}
