import { createContext, useContext, type ReactNode } from 'react';
import type { ExchangeRates, ExchangeRateOverrides, Currency } from '../types/currency';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

interface ExchangeRateContextValue {
  rates: ExchangeRates;
  baseRates: ExchangeRates;
  overrides: ExchangeRateOverrides;
  loading: boolean;
  lastUpdated: Date | null;
  setOverride: (currency: 'TWD' | 'JPY', value: number | null) => void;
  resetOverrides: () => void;
  displayCurrency: Currency;
  setDisplayCurrency: (c: Currency) => void;
}

const ExchangeRateContext = createContext<ExchangeRateContextValue | null>(null);

export function ExchangeRateProvider({ children }: { children: ReactNode }) {
  const exchangeRates = useExchangeRates();
  const [displayCurrency, setDisplayCurrency] = useLocalStorage<Currency>(
    STORAGE_KEYS.DISPLAY_CURRENCY,
    'TWD'
  );

  return (
    <ExchangeRateContext value={{ ...exchangeRates, displayCurrency, setDisplayCurrency }}>
      {children}
    </ExchangeRateContext>
  );
}

export function useExchangeRateContext(): ExchangeRateContextValue {
  const ctx = useContext(ExchangeRateContext);
  if (!ctx) throw new Error('useExchangeRateContext must be used within ExchangeRateProvider');
  return ctx;
}
