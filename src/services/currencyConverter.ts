import type { Currency, ExchangeRates } from '../types/currency';
import type { PortfolioData } from '../types/portfolio';
import { MARKET_CURRENCY_MAP } from '../utils/constants';

export function convert(
  amount: number,
  from: Currency,
  to: Currency,
  rates: ExchangeRates
): number {
  if (from === to) return amount;
  const amountInUSD = amount / rates[from];
  return amountInUSD * rates[to];
}

export function calculateNetWorth(
  portfolio: PortfolioData,
  rates: ExchangeRates,
  displayCurrency: Currency
): number {
  let total = 0;

  // Cash
  for (const [cur, amount] of Object.entries(portfolio.cash)) {
    total += convert(amount, cur as Currency, displayCurrency, rates);
  }

  // Stocks
  for (const [market, amount] of Object.entries(portfolio.stocks)) {
    const cur = MARKET_CURRENCY_MAP[market as keyof typeof MARKET_CURRENCY_MAP] as Currency;
    total += convert(amount, cur, displayCurrency, rates);
  }

  // Real estate
  total += convert(
    portfolio.realEstate.amount,
    portfolio.realEstate.currency,
    displayCurrency,
    rates
  );

  // Liabilities (subtract)
  total -= convert(
    portfolio.liabilities.amount,
    portfolio.liabilities.currency,
    displayCurrency,
    rates
  );

  return total;
}

export function calculateGrossAssets(
  portfolio: PortfolioData,
  rates: ExchangeRates,
  displayCurrency: Currency
): number {
  let total = 0;

  for (const [cur, amount] of Object.entries(portfolio.cash)) {
    total += convert(amount, cur as Currency, displayCurrency, rates);
  }

  for (const [market, amount] of Object.entries(portfolio.stocks)) {
    const cur = MARKET_CURRENCY_MAP[market as keyof typeof MARKET_CURRENCY_MAP] as Currency;
    total += convert(amount, cur, displayCurrency, rates);
  }

  total += convert(
    portfolio.realEstate.amount,
    portfolio.realEstate.currency,
    displayCurrency,
    rates
  );

  return total;
}
