import { createContext, useContext, type ReactNode } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { usePortfolio } from '../hooks/usePortfolio';

interface PortfolioContextValue {
  portfolio: PortfolioData;
  updateCash: (currency: 'TWD' | 'JPY' | 'USD', value: number) => void;
  updateStock: (market: 'TW' | 'JP' | 'US', value: number) => void;
  updateRealEstate: (update: Partial<PortfolioData['realEstate']>) => void;
  updateLiabilities: (update: Partial<PortfolioData['liabilities']>) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const value = usePortfolio();
  return <PortfolioContext value={value}>{children}</PortfolioContext>;
}

export function usePortfolioContext(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolioContext must be used within PortfolioProvider');
  return ctx;
}
