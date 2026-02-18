export type Currency = 'TWD' | 'JPY' | 'USD';

export interface ExchangeRates {
  USD: 1;
  TWD: number;
  JPY: number;
}

export interface ExchangeRateOverrides {
  TWD?: number;
  JPY?: number;
}
