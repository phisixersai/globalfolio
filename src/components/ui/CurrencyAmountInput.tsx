import type { Currency } from '../../types/currency';
import { NumberInput } from './NumberInput';
import { CurrencySelector } from './CurrencySelector';

interface CurrencyAmountInputProps {
  label: string;
  amount: number;
  currency: Currency;
  onAmountChange: (amount: number) => void;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencyAmountInput({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}: CurrencyAmountInputProps) {
  return (
    <div className="space-y-2">
      <NumberInput label={label} value={amount} onChange={onAmountChange} />
      <CurrencySelector value={currency} onChange={onCurrencyChange} />
    </div>
  );
}
