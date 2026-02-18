import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useExchangeRateContext } from '../../contexts/ExchangeRateContext';
import { Card } from '../ui/Card';

export function ExchangeRatePanel() {
  const { t } = useTranslation();
  const { rates, baseRates, overrides, setOverride, resetOverrides, lastUpdated } =
    useExchangeRateContext();

  const currencies = ['TWD', 'JPY'] as const;
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const handleOverride = (currency: 'TWD' | 'JPY', value: string) => {
    setEditingValues((prev) => ({ ...prev, [currency]: value }));
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setOverride(currency, num);
    }
  };

  const handleReset = () => {
    resetOverrides();
    setEditingValues({});
  };

  return (
    <Card title={t('exchange.title')}>
      <div className="space-y-3">
        {currencies.map((cur) => {
          const isOverridden = overrides[cur] != null;
          return (
            <div key={cur} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-10">{cur}</span>
              <input
                type="number"
                step="0.01"
                value={editingValues[cur] ?? rates[cur]}
                onChange={(e) => handleOverride(cur, e.target.value)}
                className={`flex-1 rounded-lg border py-1.5 px-3 text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark ${
                  isOverridden
                    ? 'border-yellow-400 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-gray-900 dark:text-gray-100'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              />
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {t('exchange.perUSD')}
              </span>
              {isOverridden && (
                <button
                  onClick={() => {
                    setOverride(cur, null);
                    setEditingValues((prev) => {
                      const next = { ...prev };
                      delete next[cur];
                      return next;
                    });
                  }}
                  className="text-xs text-yellow-600 dark:text-yellow-400 hover:underline"
                >
                  {t('exchange.reset')}
                </button>
              )}
            </div>
          );
        })}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          {lastUpdated && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {t('exchange.lastUpdated')}: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          {(overrides.TWD != null || overrides.JPY != null) && (
            <button
              onClick={handleReset}
              className="text-xs text-blue-500 hover:underline"
            >
              {t('exchange.reset')}
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          API: {baseRates.TWD.toFixed(2)} TWD, {baseRates.JPY.toFixed(2)} JPY {t('exchange.perUSD')}
        </p>
      </div>
    </Card>
  );
}
