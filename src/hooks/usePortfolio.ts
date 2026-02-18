import { useCallback } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, DEFAULT_PORTFOLIO } from '../utils/constants';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useLocalStorage<PortfolioData>(
    STORAGE_KEYS.PORTFOLIO,
    DEFAULT_PORTFOLIO
  );

  const updateCash = useCallback(
    (currency: 'TWD' | 'JPY' | 'USD', value: number) => {
      setPortfolio((prev) => ({
        ...prev,
        cash: { ...prev.cash, [currency]: value },
      }));
    },
    [setPortfolio]
  );

  const updateStock = useCallback(
    (market: 'TW' | 'JP' | 'US', value: number) => {
      setPortfolio((prev) => ({
        ...prev,
        stocks: { ...prev.stocks, [market]: value },
      }));
    },
    [setPortfolio]
  );

  const updateRealEstate = useCallback(
    (update: Partial<PortfolioData['realEstate']>) => {
      setPortfolio((prev) => ({
        ...prev,
        realEstate: { ...prev.realEstate, ...update },
      }));
    },
    [setPortfolio]
  );

  const updateLiabilities = useCallback(
    (update: Partial<PortfolioData['liabilities']>) => {
      setPortfolio((prev) => ({
        ...prev,
        liabilities: { ...prev.liabilities, ...update },
      }));
    },
    [setPortfolio]
  );

  return {
    portfolio,
    updateCash,
    updateStock,
    updateRealEstate,
    updateLiabilities,
  };
}
