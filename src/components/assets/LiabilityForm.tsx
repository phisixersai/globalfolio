import { useTranslation } from 'react-i18next';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { CurrencyAmountInput } from '../ui/CurrencyAmountInput';

export function LiabilityForm() {
  const { t } = useTranslation();
  const { portfolio, updateLiabilities } = usePortfolioContext();

  return (
    <CurrencyAmountInput
      label={t('assets.liabilities.amount')}
      amount={portfolio.liabilities.amount}
      currency={portfolio.liabilities.currency}
      onAmountChange={(amount) => updateLiabilities({ amount })}
      onCurrencyChange={(currency) => updateLiabilities({ currency })}
    />
  );
}
