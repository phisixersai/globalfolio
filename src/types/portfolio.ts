import type { Currency } from './currency';

export interface CashAssets {
  TWD: number;
  JPY: number;
  USD: number;
}

export interface StockAssets {
  TW: number;
  JP: number;
  US: number;
}

export interface SingleCurrencyAsset {
  amount: number;
  currency: Currency;
}

export interface PortfolioData {
  cash: CashAssets;
  stocks: StockAssets;
  realEstate: SingleCurrencyAsset;
  liabilities: SingleCurrencyAsset;
}

export type AssetCategory = 'cash' | 'stocks' | 'realEstate' | 'liabilities';

export interface AllocationSlice {
  category: string;
  label: string;
  valueInDisplayCurrency: number;
  percentage: number;
  color: string;
}

export interface BreakdownRow {
  category: string;
  label: string;
  originalAmount: number;
  originalCurrency: Currency;
  valueInDisplayCurrency: number;
}
