import { useTranslation } from 'react-i18next';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { NumberInput } from '../ui/NumberInput';

export function CashForm() {
  const { t } = useTranslation();
  const { portfolio, updateCash } = usePortfolioContext();

  return (
    <div className="space-y-3">
      <NumberInput
        label={t('assets.cash.TWD')}
        value={portfolio.cash.TWD}
        onChange={(v) => updateCash('TWD', v)}
        prefix="NT$"
      />
      <NumberInput
        label={t('assets.cash.JPY')}
        value={portfolio.cash.JPY}
        onChange={(v) => updateCash('JPY', v)}
        prefix="¥"
      />
      <NumberInput
        label={t('assets.cash.USD')}
        value={portfolio.cash.USD}
        onChange={(v) => updateCash('USD', v)}
        prefix="$"
      />
    </div>
  );
}
