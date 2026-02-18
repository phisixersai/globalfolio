import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { useExchangeRateContext } from '../../contexts/ExchangeRateContext';
import { convert } from '../../services/currencyConverter';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateAllocation } from '../../utils/calculateAllocation';
import { Card } from '../ui/Card';
import type { Currency } from '../../types/currency';
import type { BreakdownRow } from '../../types/portfolio';
import { MARKET_CURRENCY_MAP } from '../../utils/constants';

export function AssetBreakdownTable() {
  const { t } = useTranslation();
  const { portfolio } = usePortfolioContext();
  const { rates, displayCurrency } = useExchangeRateContext();

  const rows = useMemo((): BreakdownRow[] => {
    const result: BreakdownRow[] = [];

    // Cash
    for (const [cur, amount] of Object.entries(portfolio.cash)) {
      if (amount > 0) {
        result.push({
          category: 'cash',
          label: `cash.${cur}`,
          originalAmount: amount,
          originalCurrency: cur as Currency,
          valueInDisplayCurrency: convert(amount, cur as Currency, displayCurrency, rates),
        });
      }
    }

    // Stocks
    for (const [market, amount] of Object.entries(portfolio.stocks)) {
      if (amount > 0) {
        const cur = MARKET_CURRENCY_MAP[market as keyof typeof MARKET_CURRENCY_MAP] as Currency;
        result.push({
          category: 'stocks',
          label: `stocks.${market}`,
          originalAmount: amount,
          originalCurrency: cur,
          valueInDisplayCurrency: convert(amount, cur, displayCurrency, rates),
        });
      }
    }

    // Real estate
    if (portfolio.realEstate.amount > 0) {
      result.push({
        category: 'realEstate',
        label: 'realEstate',
        originalAmount: portfolio.realEstate.amount,
        originalCurrency: portfolio.realEstate.currency,
        valueInDisplayCurrency: convert(
          portfolio.realEstate.amount,
          portfolio.realEstate.currency,
          displayCurrency,
          rates
        ),
      });
    }

    // Liabilities
    if (portfolio.liabilities.amount > 0) {
      result.push({
        category: 'liabilities',
        label: 'liabilities',
        originalAmount: -portfolio.liabilities.amount,
        originalCurrency: portfolio.liabilities.currency,
        valueInDisplayCurrency: -convert(
          portfolio.liabilities.amount,
          portfolio.liabilities.currency,
          displayCurrency,
          rates
        ),
      });
    }

    return result;
  }, [portfolio, rates, displayCurrency]);

  const slices = useMemo(
    () => calculateAllocation(portfolio, rates, displayCurrency),
    [portfolio, rates, displayCurrency]
  );
  const grossTotal = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);

  if (rows.length === 0) return null;

  return (
    <Card title={t('dashboard.breakdown')}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.category')}</th>
              <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.originalAmount')}</th>
              <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.convertedValue')}</th>
              <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.percentage')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const pct = grossTotal > 0 && row.category !== 'liabilities'
                ? ((Math.abs(row.valueInDisplayCurrency) / grossTotal) * 100).toFixed(1)
                : '—';
              return (
                <tr key={row.label} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 text-gray-900 dark:text-gray-100">
                    {t(`allocation.${row.label}`, row.label)}
                  </td>
                  <td className={`py-2 text-right ${row.category === 'liabilities' ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>
                    {formatCurrency(row.originalAmount, row.originalCurrency)}
                  </td>
                  <td className={`py-2 text-right ${row.category === 'liabilities' ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>
                    {formatCurrency(row.valueInDisplayCurrency, displayCurrency)}
                  </td>
                  <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                    {pct}{pct !== '—' && '%'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
