import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ui/ThemeToggle';
import { CurrencySelector } from '../ui/CurrencySelector';
import { useExchangeRateContext } from '../../contexts/ExchangeRateContext';

export function Header() {
  const { t } = useTranslation();
  const { displayCurrency, setDisplayCurrency } = useExchangeRateContext();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('app.title')}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('app.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
              {t('currency.displayCurrency')}
            </span>
            <CurrencySelector value={displayCurrency} onChange={setDisplayCurrency} />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
