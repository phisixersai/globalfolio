import { useTranslation } from 'react-i18next';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { CurrencyAmountInput } from '../ui/CurrencyAmountInput';

export function RealEstateForm() {
  const { t } = useTranslation();
  const { portfolio, updateRealEstate } = usePortfolioContext();

  return (
    <CurrencyAmountInput
      label={t('assets.realEstate.amount')}
      amount={portfolio.realEstate.amount}
      currency={portfolio.realEstate.currency}
      onAmountChange={(amount) => updateRealEstate({ amount })}
      onCurrencyChange={(currency) => updateRealEstate({ currency })}
    />
  );
}
