import { useTranslation } from 'react-i18next';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { useExchangeRateContext } from '../../contexts/ExchangeRateContext';
import { calculateNetWorth, calculateGrossAssets, convert } from '../../services/currencyConverter';
import { formatCurrency } from '../../utils/formatCurrency';

export function NetWorthBanner() {
  const { t } = useTranslation();
  const { portfolio } = usePortfolioContext();
  const { rates, displayCurrency } = useExchangeRateContext();

  const netWorth = calculateNetWorth(portfolio, rates, displayCurrency);
  const grossAssets = calculateGrossAssets(portfolio, rates, displayCurrency);
  const totalLiabilities = convert(
    portfolio.liabilities.amount,
    portfolio.liabilities.currency,
    displayCurrency,
    rates
  );

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl p-6 text-white">
      <p className="text-sm opacity-80">{t('dashboard.netWorth')}</p>
      <p className="text-3xl font-bold mt-1">{formatCurrency(netWorth, displayCurrency)}</p>
      <div className="flex gap-6 mt-4 text-sm">
        <div>
          <span className="opacity-70">{t('dashboard.grossAssets')}</span>
          <p className="font-semibold">{formatCurrency(grossAssets, displayCurrency)}</p>
        </div>
        <div>
          <span className="opacity-70">{t('dashboard.totalLiabilities')}</span>
          <p className="font-semibold text-red-200">-{formatCurrency(totalLiabilities, displayCurrency)}</p>
        </div>
      </div>
    </div>
  );
}
