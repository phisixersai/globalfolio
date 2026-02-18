import { useTranslation } from 'react-i18next';
import type { Currency } from '../../types/currency';

const CURRENCIES: Currency[] = ['TWD', 'JPY', 'USD'];

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencySelector({ value, onChange, className = '' }: CurrencySelectorProps) {
  const { t } = useTranslation();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Currency)}
      className={`rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark ${className}`}
    >
      {CURRENCIES.map((cur) => (
        <option key={cur} value={cur}>
          {t(`currency.${cur}`)}
        </option>
      ))}
    </select>
  );
}
