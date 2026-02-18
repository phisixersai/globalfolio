import { useState, useEffect, useCallback } from 'react';
import type { ExchangeRates, ExchangeRateOverrides } from '../types/currency';
import { fetchExchangeRates, DEFAULT_RATES } from '../services/exchangeRateApi';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export function useExchangeRates() {
  const [baseRates, setBaseRates] = useState<ExchangeRates>(DEFAULT_RATES);
  const [overrides, setOverrides] = useLocalStorage<ExchangeRateOverrides>(
    STORAGE_KEYS.EXCHANGE_RATE_OVERRIDES,
    {}
  );
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const rates = await fetchExchangeRates();
      if (!cancelled) {
        setBaseRates(rates);
        setLastUpdated(new Date());
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const effectiveRates: ExchangeRates = {
    USD: 1,
    TWD: overrides.TWD ?? baseRates.TWD,
    JPY: overrides.JPY ?? baseRates.JPY,
  };

  const setOverride = useCallback(
    (currency: 'TWD' | 'JPY', value: number | null) => {
      setOverrides((prev) => {
        const next = { ...prev };
        if (value === null) {
          delete next[currency];
        } else {
          next[currency] = value;
        }
        return next;
      });
    },
    [setOverrides]
  );

  const resetOverrides = useCallback(() => {
    setOverrides({});
  }, [setOverrides]);

  return {
    rates: effectiveRates,
    baseRates,
    overrides,
    loading,
    lastUpdated,
    setOverride,
    resetOverrides,
  };
}
